# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - generic [ref=e3]:
    - generic [ref=e4]:
      - img [ref=e5]
      - heading "Something went wrong" [level=1] [ref=e7]
    - generic [ref=e8]:
      - paragraph [ref=e9]: We’re sorry, but something unexpected happened. Our team has been notified and we’re working to fix the issue.
      - group [ref=e10]:
        - generic "Error Details (Development Only)" [ref=e11] [cursor=pointer]
    - generic [ref=e12]:
      - button "Try again" [ref=e13] [cursor=pointer]:
        - generic [ref=e14]:
          - img [ref=e15]
          - text: Try again
      - link "Go home" [ref=e20]:
        - /url: /
        - button "Go home" [ref=e21] [cursor=pointer]:
          - generic [ref=e22]:
            - img [ref=e23]
            - text: Go home
  - generic [ref=e30] [cursor=pointer]:
    - button "Open Next.js Dev Tools" [ref=e31]:
      - img [ref=e32]
    - generic [ref=e37]:
      - button "Open issues overlay" [ref=e38]:
        - generic [ref=e39]:
          - generic [ref=e40]: "0"
          - generic [ref=e41]: "1"
        - generic [ref=e42]: Issue
      - button "Collapse issues badge" [ref=e43]:
        - img [ref=e44]
  - alert [ref=e46]
```