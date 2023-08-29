# CODE WITH CISCO HACKATHON

**Dashboard for Role-Based Access Control System**


## Problem Overview

Cisco TrustSec is a crucial network security feature that categorizes endpoints into groups, each with specific communication rules. These rules, denoted in a matrix format, dictate interactions between source and destination groups, ensuring controlled conversations. However, managing extensive matrices for thousands of rules can become unwieldy. Hence, Cisco TrustSec streamlines security by efficiently regulating inter-group communications while minimizing complexity.

## Existing Solution

![image](https://github.com/raoprashant61/Code_With_Cisco/assets/61898303/1203c752-751b-4535-a750-4ed88f7cb752)


## Our Solution

- Nodes represented as hexagonal array
- Instead of N*N matrix only N cells are required
- Interactive representation

**FLOW**

- 3 API endpoints are created.
- Uploading rules data
- Uploading rule based access control data
- Node visualization dashboard
- Dashboards helps in visualization of access control
- When the user clicks a node, it returns all nodes connected to it, for more information user can click the required node to know the type of access controls used.

![image](https://github.com/raoprashant61/Code_With_Cisco/assets/61898303/ccfe1e6e-cf49-4e6e-8799-24f1a17bb9fa)


## Installation

* client

```shell
npm install
npm run dev

```

* Server

```shell
npm start

```

## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

Please make sure to update tests as appropriate.
