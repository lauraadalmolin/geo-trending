## Geo Trending

Find what is being tweeted around an inputed address.

![Project demo](https://github.com/lauraadalmolin/geo-trending/blob/main/public/../../../../../../../public/demo.png)

Test a demo of this project [here](https://geo-trending-ds.herokuapp.com/).


### Installing

You will need:
- Node.js (v16 or above)
- Twitter API Bearer Token
- Google Maps API Key
- Position Stack API Key

When you have all the necessary API keys, create a *.env* in the root of the project. The file must contain the following:

~~~
POSITION_STACK_API_KEY='YOUR_API_KEY'
GOOGLE_MAPS_API_KEY='YOUR_API_KEY'
TWITTER_BEARER_TOKEN='YOUR_BEARER_TOKEN'
~~~


Then, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

