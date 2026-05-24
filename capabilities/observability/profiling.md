# Profiling (pprof)

CPU, memory, goroutine, and block profiling for performance optimization.

---

## Metadata

| Field | Value |
|-------|-------|
| **Capability ID** | `cap-obs-008` |
| **Category** | Observability |
| **Status** | GA |
| **Availability** | Free / Pro / Enterprise |
| **Related Capabilities** | `cap-obs-004` |

---

## Quick Reference

### Name
Profiling (pprof)

### Tagline
Deep performance analysis for Go applications.

### Elevator Pitch
Cosmo Router exposes Go's built-in pprof profiling endpoints for deep performance analysis. Capture CPU profiles to identify hot code paths, heap profiles to diagnose memory issues, and goroutine profiles to detect deadlocks. Generate comprehensive profile archives for sharing with support or analyzing offline.

---

## Problem & Solution

### The Problem
When the router experiences performance issues - high CPU usage, memory growth, or deadlocks - teams need detailed profiling data to diagnose the root cause. Standard metrics show symptoms but not causes. Without profiling, teams guess at solutions or escalate without actionable data.

### The Solution
Cosmo Router integrates Go's pprof package, exposing endpoints for CPU, memory, goroutine, and blocking profiling. Teams can capture profiles during issues, visualize them with Go tooling, and share comprehensive archives with support. This enables precise diagnosis of performance bottlenecks and memory leaks.

### Before & After

| Before Cosmo | With Cosmo |
|--------------|------------|
| Guess at performance issues | Precise CPU hotspot identification |
| Memory leaks hard to diagnose | Heap profiles show allocation patterns |
| Deadlocks mysterious | Goroutine profiles reveal blocking |
| Long debugging cycles | Actionable data in minutes |

---

## Key Benefits

1. **CPU Profiling**: Identify functions consuming excessive CPU time
2. **Memory Profiling**: Diagnose memory leaks and allocation patterns
3. **Goroutine Analysis**: Detect deadlocks and blocking operations
4. **Easy Sharing**: Script generates profile archive for support
5. **Standard Tooling**: Works with Go's pprof visualization tools

---

## Target Audience

### Primary Persona
- **Role**: SRE / Performance Engineer
- **Pain Points**: Difficult to diagnose production performance issues; memory leaks hard to track
- **Goals**: Rapid root cause identification; optimize resource usage

### Secondary Personas
- Backend developers optimizing code
- Support engineers troubleshooting customer issues
- Platform engineers capacity planning

---

## Use Cases

### Use Case 1: CPU Hotspot Identification
**Scenario**: Router instances show high CPU usage during peak traffic, but the team cannot identify the cause.
**How it works**: Enable pprof, capture a 30-second CPU profile during high load, visualize with `go tool pprof` to see which functions consume the most CPU time.
**Outcome**: Identified inefficient JSON serialization; optimized code path reduced CPU usage by 40%.

### Use Case 2: Memory Leak Investigation
**Scenario**: Router memory usage grows steadily over days, requiring periodic restarts.
**How it works**: Capture heap profiles at regular intervals, compare allocation patterns to identify growing objects. Use `go tool pprof` diff mode to see what changed.
**Outcome**: Found a subscription handler not releasing resources; fix eliminated memory growth.

### Use Case 3: Deadlock Detection
**Scenario**: Router occasionally stops responding to requests without crashing.
**How it works**: Capture goroutine profile with debug=2 to get stack traces of all goroutines. Identify blocked goroutines waiting on locks.
**Outcome**: Discovered lock contention in cache implementation; restructured locking strategy.

---

## Competitive Positioning

### Key Differentiators
1. Built-in pprof integration requiring only environment variable to enable
2. Comprehensive profile types (CPU, heap, goroutine, block, thread)
3. Ready-to-use automation script for profile collection
4. Compatible with standard Go tooling

### Comparison with Alternatives

| Aspect | Cosmo pprof | External APM | Custom Profiling |
|--------|-------------|--------------|------------------|
| Setup Effort | One env var | Agent install | Code changes |
| Profile Types | All Go types | Limited | Custom |
| Visualization | Go tooling | Proprietary | Custom |
| Overhead | On-demand | Always-on | Varies |

### Common Objections & Responses

| Objection | Response |
|-----------|----------|
| "Security concern exposing pprof" | Endpoint is disabled by default; enable only when needed; never expose to production |
| "Performance overhead" | Profiles are captured on-demand; no overhead when not actively profiling |
| "We don't have Go expertise" | Profile archives can be shared with WunderGraph support for analysis |

---

## Technical Summary

### How It Works
Setting the `PPROF_ADDR` environment variable starts an HTTP server exposing pprof endpoints. Teams can then fetch profiles via curl or access them interactively with `go tool pprof`. Profiles capture point-in-time snapshots (heap, goroutine) or time-bounded recordings (CPU) of application state.

### Key Technical Features

**Enable Profiling:**
```bash
PPROF_ADDR=:6060
```

**Available Endpoints:**
- `/debug/pprof/heap` - Memory allocations
- `/debug/pprof/profile` - CPU profile (30s default)
- `/debug/pprof/goroutine` - Active goroutines
- `/debug/pprof/threadcreate` - Thread creation
- `/debug/pprof/block` - Blocking operations

**Profile Collection:**
```bash
# CPU profile (30 seconds)
curl http://localhost:6060/debug/pprof/profile?seconds=30 > profile.out

# Heap profile
curl http://localhost:6060/debug/pprof/heap > heap.out

# Goroutine dump with stack traces
curl http://localhost:6060/debug/pprof/goroutine?debug=2 > goroutine.txt
```

**Visualization:**
```bash
go tool pprof -http 127.0.0.1:8079 profile.out
```

### Integration Points
- Go pprof tooling for visualization
- IDE integrations (GoLand, VS Code)
- CI/CD for automated performance testing
- Support workflows for issue diagnosis

### Requirements & Prerequisites
- Go installed for visualization tools
- Network access to pprof endpoint
- Router started with `PPROF_ADDR` set

---

## Proof Points

### Metrics & Benchmarks
- CPU profile default: 30 seconds
- Zero overhead when disabled
- Profiles compatible with all Go visualization tools

### Customer Quotes
> "The pprof integration saved us hours of debugging. We captured a heap profile and immediately saw the memory leak in our custom middleware." - Platform Engineer

---

## Content Assets

| Asset Type | Status | Link |
|------------|--------|------|
| Landing Page | Needed | |
| Blog Post | Needed | |
| Video Demo | Needed | |
| Pitch Deck Slide | Needed | |
| One-Pager | Needed | |
| Battle Card | Needed | |

---

## Documentation References

- Primary docs: `/docs/router/profiling`
- Go pprof blog: `https://go.dev/blog/pprof`

---

## Keywords & SEO

### Primary Keywords
- Go profiling
- pprof GraphQL
- Performance profiling router

### Secondary Keywords
- Memory leak detection Go
- CPU profiling GraphQL
- Goroutine analysis

### Related Search Terms
- How to profile Go applications
- GraphQL router performance
- Memory profiling production
- Deadlock detection Go

---

## Version History

| Date | Version | Changes |
|------|---------|---------|
| 2025-01-14 | 1.0 | Initial capability documentation |
