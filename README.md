## React + Recoil + TailWindCSS + Caver-js

---

### Version

    npm - 6.14.11
    node - v14.16.0
    caver - 1.4.1

=> ( Caver-js dependency -> v12.21.0 or v14.16.0(this) )

---

## .env

```.env
NEXT_PUBLIC_NFT_CA=0x00...
```

```js
const nextConfig = {
  reactStrictMode: true,
  env: {
    NFT_CA: process.env.NFT_CA,
  }, // <- append
};

module.exports = nextConfig;

// next.config.js
```

`NEXT_PUBLIC_`+YOUR_KEY

---

## React Snippets

- rafce

```js
import React from "react";

const Name = () => {
  return <div>Name</div>;
};

export default Name;

// Name.js
```

---

## Recoil

```js
import { atom } from "recoil";

const simpleState = atom({
  key: "simpleState",
  default: "",
});

const defaultState = atom({
  key: "defaultState",
  default: 0,
});

export { simpleState, defaultState };

// states.js
```

---

## SSR with Caver-js

A

```js
if (typeof window !== "undefined") {
  // Your Code
}
```

B

```js
useEffect(() => {
  // Your Code
});
```
