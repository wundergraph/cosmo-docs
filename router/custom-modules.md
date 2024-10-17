---
description: >-
  Customize your router by writing just a few lines of Go code and compiling it
  with a single command. Eliminate the complexities associated with writing
  scripts and use the existing Go ecosystem.
icon: cubes
---

# Custom Modules

{% hint style="info" %}
In order to complete this section you need to have Golang 1.20 (or higher) and docker installed.
{% endhint %}

The Cosmo Router can be easily extended by providing custom modules. Modules are pure Go code and can implement one or multiple interfaces. The following interfaces are provided:

* **`core.RouterMiddlewareHandler`** Implements a custom middleware on the router. The middleware is called for every client request. It allows you to modify the request before it is processed by the GraphQL engine. **Use case:** Logging, Caching, Early return, Request Validation, Header manipulation.
* **`core.EnginePreOriginHandler`** Implements a custom handler that is executed before the request is sent to the subgraph. This handler is called for every subgraph request. **Use case:** Logging, Header manipulation.
* **`core.EnginePostOriginHandler`** Implement a custom handler executed after the request to the subgraph but before the response is passed to the GraphQL engine. This handler is called for every subgraph response. **Use cases:** Logging, Caching.
* **`core.Provisioner`** Implements a Module lifecycle hook that is executed when the module is instantiated. Use it to prepare your module and validate the configuration.
* **`core.Cleaner`** Implements a Module lifecycle hook that is executed after the server is shutdown. Use it to close connections gracefully or for any other cleanup.

{% hint style="info" %}
`*OriginHandler` handlers are called concurrently when your GraphQL operation results in multiple subgraph requests. Due to that circumstance, you should handle the initial router request/response objects `ctx.Request()` and `ctx.ResponseWriter()` as read-only objects. Any modification without protecting them from concurrent writes, e.g., by a mutex, results in a race condition.
{% endhint %}

## Example

The example below shows how to implement a custom middleware that has access to the GraphQL operation information.

```go
package module

import (
	"context"
	"fmt"
	"github.com/wundergraph/cosmo/router/core"
	"net/http"
)

func init() {
	// Register your module here and it will be loaded at router start
	core.RegisterModule(&MyModule{})
}

type MyModule struct {}

func (m *MyModule) Middleware(ctx core.RequestContext, next http.Handler) {

	operation := ctx.Operation()

	// Access the GraphQL operation context
	fmt.Println(
		operation.Name(),
		operation.Type(),
		operation.Hash(),
		operation.Content(),
	)

	// Call the next handler in the chain or
	// return early by calling ctx.ResponseWriter().Write()
	next.ServeHTTP(ctx.ResponseWriter(), ctx.Request())
}

func (m *MyModule) Module() core.ModuleInfo {
	return core.ModuleInfo{
		// This is the ID of your module, it must be unique
		ID: "myModule",
		// The priority of your module, lower the number higher the priority
		// Value should be > 0
		Priority: 1,
		New: func() app.Module {
			return MyModule{}
		},
	}
}

// Interface guards
// In words: My Module has to implement the following interfaces
// otherwise it will not compile
var (
	_ core.RouterMiddlewareHandler = (*MyModule)(nil)
)
```

## Priority Loading of Modules

When loading multiple modules, the order is not inherently guaranteed. To ensure a specific loading order, you can use the `Priority` option. Modules with lower priority numbers are loaded first. Below is an example configuration:

```go
core.ModuleInfo{
	// This is the ID of your module, it must be unique
	ID: "myModule",
	// The priority of your module, lower the number higher the priority
	// Value should be > 0
	Priority: 1,
	New: func() app.Module {
		return MyModule{}
	},
}
```

In this example, the module `myModule` has a priority of 1, meaning it will be loaded before modules with higher priority values.

## Access the GraphQL operation

During the client request, you have access to the actual GraphQL operation. Simply call:

```go
// ctx core.RequestContext

operation := ctx.Operation()
c.Name() // MyOperation
c.Type() // Query
c.OperationHash() // 81671788718
c.Content() // query MyOperation { ... }
```

## Access Request Context

In every handler, you can add/remove, or modify response headers. We also provide a convenient, safe way to share data across handlers.

```go
// ctx core.RequestContext

// Sets a custom header on the final response
ctx.ResponseWriter().Header().Set("myHeader", c.GetString("myKey"))

// Provides access to the request logger 
ctx.Logger().Info("My log line")

// Sets a value on the context. Use c.GetString to access the underlying value
// in any other handler you want
ctx.Set("myKey", "myValue")
```

## Access Subgraph through Request Context

Through the request context you can retrieve the active subgraph for the current request. This can be done in the OnOriginRequest hook as show below&#x20;

```go
func (m MyModule) OnOriginRequest(request *http.Request, ctx core.RequestContext) (*http.Request, *http.Response) {	
	subgraph := ctx.ActiveSubgraph(request)
	subgraph.Name // Subgraph name
	subgraph.Id   // Subgraph ID from the controlplane
	subgraph.Url  // Stored subgraph URL from the router config
}
```

{% hint style="info" %}
A more complex example including tests is accessible at \
[https://github.com/wundergraph/cosmo/tree/main/router/cmd/custom](https://github.com/wundergraph/cosmo/tree/main/router/cmd/custom)
{% endhint %}

## Access authentication information

Authentication information, including claims and the provider that authenticated the request, can be accessed through `core.RequestContext.Authentication()`

```go
func (m *JWTModule) OnOriginRequest(request *http.Request, ctx core.RequestContext) (*http.Request, *http.Response) {
	// Check if the incoming request is authenticated. In that case, we
	// generate a new JWT with the shared secret key and add it to the
	// outgoing request.
	auth := ctx.Authentication()
	if auth != nil {
		claims := auth.Claims()
		m.Logger.Info("subject", zap.String("sub", claims["sub"]))
		// Modify request using claims
		// ...
	
	}
	return request, nil
}
```

{% hint style="info" %}
For a full example, please check out\
[https://github.com/wundergraph/cosmo/tree/main/router/cmd/custom-jwt](https://github.com/wundergraph/cosmo/tree/main/router/cmd/custom-jwt)
{% endhint %}

## Return GraphQL conform errors

Please always use `core.WriteResponseError` to return an error. It ensures that the request is properly tracked for tracing and metrics.

```go
func (m *MyModule) Middleware(ctx core.RequestContext, next http.Handler) {
    // Exit early
    core.WriteResponseError(ctx, fmt.Errorf("my custom error: %w", err))
    // or pass on
    next.ServeHTTP(ctx.ResponseWriter(), ctx.Request())
}
```

## Request Handler lifecycle

The current module handler allow to intercept and modify request / response subgraphs.

```
Incoming client request
    │
    └─▶ core.RouterMiddlewareHandler (Early return, Validation)
       │
       └─▶ core.EnginePreOriginHandler (Header mods, Custom Response, Caching)
       │
       └─▶ "Request to the subgraph"
       │
       └─▶ core.EnginePostOriginHandler (Logging, Response mods)
       │
       └─▶ "Fulfill subgraph response"
```

## Module Configuration

If you need to pass external configuration values to your module, you can do so easily by annotating the fields in your module struct. Fields must start with an uppercase letter to make them accessible.

```go
const myModuleID = "myModule"

type MyModule struct {
	// Properties that are set by the config file are automatically populated based on the `mapstructure` tag
	// Create a new section under `modules.<name>` in the config file with the same name as your module.
	// Don't forget in Go the first letter of a property must be uppercase to be exported

	Value uint64 `mapstructure:"value"`

	Logger *zap.Logger
}
```

### Example Config file

Based on the example above we will populate the field `Value` with the value `1`. You can also validate your config in the `core.Provisioner` handler.

{% code title="config.yaml" %}
```yaml
version: '1'

modules:
  myModule: # Id of your module
    Value: 1
```
{% endcode %}

## Development

Due to the circumstance that modules are pure Go code, we can leverage all tooling. If you have VSCode or Goland you can easily debug and profile your code. Let's make it running locally first:

1. Clone _the_ [Cosmo Repository](https://github.com/wundergraph/cosmo)
2. Navigate to the router [directory](https://github.com/wundergraph/cosmo/tree/main/router)
3. Copy `.env.example` to `.env` and fill in all required values.
4. Run `go run cmd/custom/main.go` to start your router or use your IDE to start the debug mode.
5. Open [http://localhost:3002](http://localhost:3002) to test your module code.

## Build your own Router Image

We provide a dockerfile that can be used to build a production-grade docker image from your custom router. Run the following command in the router [directory](https://github.com/wundergraph/cosmo/tree/main/router).

```bash
docker build -f custom.Dockerfile -t router-custom:latest .
```

In order to start your router run:

```bash
docker run \
  --name custom-cosmo-router \
  --rm \
  -p 3002:3002 \
  --add-host=host.docker.internal:host-gateway \
  -e DEV_MODE=true \
  -e LISTEN_ADDR=0.0.0.0:3002 \
  -e GRAPH_API_TOKEN=<graph-api-token> \
  docker.io/library/router-custom:latest
```

### Versioning

Please ensure that you checkout on an official [router tag](https://github.com/wundergraph/cosmo/tags) when extending the router, and only upgrade if necessary. This way, you can avoid any surprises. For every release, we provide detailed release notes that should provide you with a good overview of whether an upgrade is worthwhile.

{% hint style="info" %}
Please inform us if you have more advanced use cases that cannot be accommodated with the current feature set.
{% endhint %}
