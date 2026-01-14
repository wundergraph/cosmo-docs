# File Upload

## Metadata

| Field | Value |
|-------|-------|
| **Capability ID** | `cap-proxy-005` |
| **Category** | Proxy |
| **Status** | GA |
| **Availability** | Free, Pro, Enterprise |
| **Related Capabilities** | `cap-proxy-001` (Request Header Operations) |

---

## Quick Reference

### Name
File Upload

### Tagline
GraphQL multipart file uploads through the router.

### Elevator Pitch
File Upload enables your federated GraphQL API to handle file uploads using the industry-standard GraphQL multipart request specification. Support single and multiple file uploads through your router without custom infrastructure, using the same GraphQL operations pattern your clients already know.

---

## Problem & Solution

### The Problem
File uploads in GraphQL have historically been awkward. The GraphQL specification does not define how to handle binary data, leading teams to build separate REST endpoints, use base64 encoding (inefficient), or implement proprietary solutions. In federated architectures, the challenge compounds - how do you route file uploads through the gateway to the correct subgraph while maintaining the GraphQL experience?

### The Solution
Cosmo Router implements the GraphQL multipart request specification, the de facto standard for GraphQL file uploads. Clients send files using standard multipart/form-data encoding, with a mapping that associates files to GraphQL variables. The router handles the multipart parsing and forwards files to the appropriate subgraph. Define a simple `Upload` scalar in your schema, and you are ready to accept files.

### Before & After

| Before Cosmo | With Cosmo |
|--------------|------------|
| Separate REST endpoints for file uploads | Unified GraphQL API for everything |
| Base64 encoding with 33% overhead | Efficient binary multipart transfer |
| Custom file routing logic | Automatic federation routing |
| Proprietary upload implementations | Standards-compliant specification |

---

## Key Benefits

1. **Standards Compliant**: Implements the GraphQL multipart request specification used by Apollo, Relay, and major GraphQL clients
2. **Single and Multiple Files**: Support uploading one file or many in a single mutation
3. **Unified API**: Files upload through the same GraphQL endpoint as all other operations
4. **Configurable Limits**: Control max file size, number of files, and other upload parameters
5. **Type-Safe**: Use the `Upload` scalar in your schema for clear API contracts

---

## Target Audience

### Primary Persona
- **Role**: Backend Developer / API Designer
- **Pain Points**: Needs file upload capability in GraphQL API; wants to avoid maintaining separate REST endpoints; requires control over upload limits
- **Goals**: Build comprehensive GraphQL APIs; handle user-generated content; maintain consistent API patterns

### Secondary Personas
- Frontend developers integrating file uploads
- Mobile developers building image/document upload features
- Platform engineers configuring upload policies

---

## Use Cases

### Use Case 1: User Avatar Upload
**Scenario**: Your application allows users to upload profile photos through your GraphQL API.
**How it works**: Define an `Upload` scalar and a `updateAvatar(file: Upload!): User!` mutation. Clients use a multipart-capable GraphQL client to send the image file with the mutation. The router parses the multipart request and forwards it to the user service subgraph.
**Outcome**: Profile photo uploads work through the same GraphQL API as all other user operations, with consistent authentication and error handling.

### Use Case 2: Document Attachment in Mutations
**Scenario**: Users need to attach multiple documents when creating a support ticket.
**How it works**: Define a mutation `createTicket(description: String!, attachments: [Upload!]!): Ticket!`. Clients map multiple files to the attachments variable in the multipart request. The router handles parsing and routing to the ticket service.
**Outcome**: Rich document upload experience without building separate file handling infrastructure.

### Use Case 3: Bulk Import via File
**Scenario**: Administrators import data by uploading CSV or Excel files through the admin interface.
**How it works**: Create an `importData(file: Upload!): ImportResult!` mutation in your admin subgraph. The router forwards the uploaded file, the subgraph parses and processes it, returning import statistics.
**Outcome**: File-based data import integrated into your GraphQL admin API with proper authentication and authorization.

---

## Technical Summary

### How It Works
The Cosmo Router accepts `multipart/form-data` requests following the GraphQL multipart request specification. The request contains three key parts: `operations` (the GraphQL operation with file variables set to null), `map` (associations between form fields and variable paths), and the file fields themselves. The router parses this structure, associates files with their variables, and forwards the request to the appropriate subgraph.

### Key Technical Features
- GraphQL multipart request specification compliant
- Support for single file uploads
- Support for multiple file uploads in one operation
- Configurable file size limits
- Configurable maximum number of files
- Custom `Upload` scalar type
- Automatic routing to appropriate subgraph

### Integration Points
- Works with Apollo Client, Relay, urql, and other spec-compliant clients
- Compatible with popular backend libraries (graphql-upload, etc.)
- Integrates with existing authentication and authorization

### Requirements & Prerequisites
- Define `Upload` scalar in subgraph schema
- Implement file handling in subgraph resolvers
- Use multipart-capable GraphQL client
- Configure router upload limits as needed

---

## Documentation References

- Primary docs: `/docs/router/file-upload`
- Configuration options: `/docs/router/configuration#file-upload`
- GraphQL multipart spec: `https://github.com/jaydenseric/graphql-multipart-request-spec`

---

## Keywords & SEO

### Primary Keywords
- GraphQL file upload
- Multipart GraphQL request
- Federation file upload

### Secondary Keywords
- GraphQL binary upload
- Upload scalar GraphQL
- GraphQL image upload

### Related Search Terms
- How to upload files with GraphQL
- GraphQL multipart request specification
- File upload through GraphQL gateway

---

## Version History

| Date | Version | Changes |
|------|---------|---------|
| 2025-01-14 | 1.0 | Initial capability documentation |
