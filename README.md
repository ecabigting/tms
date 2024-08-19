# tms

![nestjs](https://img.shields.io/badge/nestjs-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)
![nextjs](https://img.shields.io/badge/next%20js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![mongodb](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![tailwindcss](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![shadcn/ui](https://img.shields.io/badge/shadcn%2Fui-000000?style=for-the-badge&logo=shadcnui&logoColor=white)

### Installation

Clone this repo

```zsh
git clone https://github.com/ecabigting/tms.git
```

Run the app via `docker`

```zsh
cd tms
docker compose up
```

> The mongodb is automatically seeded on first run, one default account can be use to login:

### Accessing the webapp

Open a browser and navigate to http://localhost:3000

> The mongodb is automatically seeded on first run, one default account can be use to login:

```zsh
erictestemail.gmail.com
tester123@Admin#
```

### API testing

If you have `Thunder Client` for VSCODE, you can use the `thunder-collection_taskmanagementsystemendpoints.json` file in the root folder use to call the api.

> Please note all APIs are protected by a JWT token, use the `tms-sign` api call from the collection to generate a token like this:

```json
{
	"tokens": {
		"accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NmMyMzIzNzNkYjExOWRkMTlhYTJjMDUiLCJyb2xlIjoiQWRtaW4iLCJpYXQiOjE3MjQwMDI5NTcsImV4cCI6MTcyNDMzNjI5MH0.v4lmx5H5UBCZkYq20bE9ELaLNiblDsHV5UrWkEvTQ9c",
		"accessTokenExp": "2024-08-22T14:18:10.772Z",
		"refreshToken": "8c660d26-a00d-4b35-83d0-6c436a9f9fe3",
		"refreshTokenExp": "2024-08-18T17:57:37.772Z",
		"userId": "66c232373db119dd19aa2c05",
		"isEnabled": true,
		"_id": "66c2328d3db119dd19aa2da3",
		"createdAt": "2024-08-18T17:42:37.775Z",
		"updatedAt": "2024-08-18T17:42:37.775Z",
		"__v": 0
	},
	"user": {
		"id": "66c232373db119dd19aa2c05",
		"name": "Maggie Conroy",
		"email": "hoyt.nader@hotmail.com",
		"role": "Admin",
		"image": "https://loremflickr.com/100/100?lock=7884645878202368"
	}
}
```

Copy the `tokens->accessToken` value from the json and add it to your request header as `bearer` token

<!--
docker system prune -af && \
docker image prune -af && \
docker system prune -af --volumes && \
docker system df
-->
