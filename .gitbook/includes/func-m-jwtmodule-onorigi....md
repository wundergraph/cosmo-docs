---
title: func (m *JWTModule) OnOrigi...
---

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
