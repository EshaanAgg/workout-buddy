# 🔖 Workout Buddy

A simple app to store your workout routines. Made with Nuxt 3 and Appwrite.

## 🔖 Screenshots of the App

<p align="center">
<img src="./assets/pics/1.png" alt="Signup Screen">
</p>

<p align="center">
<img src="./assets/pics/2.png" alt="Login Screen">
</p>

<p align="center">
<img src="./assets/pics/3.png" alt="Workouts Screen">
</p>

## 🎬 Getting Started

### 🤘 Install Appwrite

Follow the simple [Installation Guide](https://appwrite.io/docs/installation) to get Appwrite up and running in no time. You can either deploy Appwrite on your local machine or, on any cloud provider of your choice.

> Note: If you setup Appwrite on your local machine, you will need to create a public IP so that your hosted frontend can access it.

We need to make a few configuration changes to your Appwrite server.

1. Add a new Web App in Appwrite and enter the endpoint of your website (`localhost, <project-name>.vercel.app etc`)
   ![Appwrite Console](https://user-images.githubusercontent.com/31401437/155891052-09bb17e4-a30c-4c73-8c9f-b1cc0b44c596.png)

2. Create a new database, and then a new collection with the following properties.

- **Attributes**
  Add the following attributes to the collection.
  > Make sure that your Attribute ID exactly matches the key in the images

<p align="center">
<img src="./assets/pics/title.png" alt="title Attribute" width="400">
</p>

<p align="center">
<img src="./assets/pics/load.png" alt="load Attribute" width="400">
</p>

<p align="center">
<img src="./assets/pics/reps.png" alt="reps Attribute" width="400">
</p>

<p align="center">
<img src="./assets/pics/link.png" alt="link Attribute" width="400">
</p>

- **Permissions**
  Add the following permissions to your collection. These permissions ensure that only registered users can access the collection.

<p align="center">
<img src="./assets/pics/permissions.png" alt="Collection Permissions" width="400">
</p>

### 🚀 Deploy the Front End

You have two options to deploy the front-end and we will cover both of them here. In either case, you will need to fill in these environment variables that help your frontend connect to Appwrite.

- NUXT_APP_ENDPOINT - Your Appwrite endpoint
- NUXT_APP_PROJECT - Your Appwrite project ID
- NUXT_APP_COLLECTION_ID - Your Appwrite collection ID
- NUXT_APP_DATABASE_ID - Your Appwrite database ID

### **Deploy to a Static Hosting Provider**

You can deploy to your favourite hosting providers, including Vercel, Netlify and DigitalOcean. You will need to enter the environment variables above when prompted.

> Note: Vercel is unable to auto detect the framework so please use the Vue Framework in case of vercel.

### **Run locally**

Follow these instructions to run the demo app locally

```sh
$ git clone https://github.com/EshaanAgg/workout-buddy
$ cd workout-buddy
```

Run the following command to generate your `.env` vars

```sh
$ cp .env.example .env
```

Now fill in the envrionment variables we discussed above in your `.env`

Now run the following commands and you should be good to go 💪🏼

```
$ npm install
$ npm run dev
```

## 🚀 Appwrite CLI

### Installation

You can follow the simple guide [here](https://appwrite.io/docs/command-line) on the official Appwrite docs to globally install the Appwrite CLI and link it to your project. Then you can conviniently use it to manage, track and even deploy your collections!

### Appwrite.json

Here is my appwrite.json file, that lists the complete structure of my Appwrite backend. You can verify and compare yours to the same to verify the backend has been setup properly.

```
{
    "projectId": "634502e6b603aa796019",
    "projectName": "workout-buddy",
    "collections": [
        {
            "$id": "634503105a8d544ab6e9",
            "$createdAt": "2022-10-11T05:45:52.371+00:00",
            "$updatedAt": "2022-10-13T08:41:12.299+00:00",
            "$permissions": [
                "create(\"users\")"
            ],
            "databaseId": "63450305d0f1b108e5bc",
            "name": "workouts",
            "enabled": true,
            "documentSecurity": true,
            "attributes": [
                {
                    "key": "title",
                    "type": "string",
                    "status": "available",
                    "required": true,
                    "array": false,
                    "size": 255,
                    "default": null
                },
                {
                    "key": "load",
                    "type": "integer",
                    "status": "available",
                    "required": true,
                    "array": false,
                    "min": 0,
                    "max": 1000,
                    "default": null
                },
                {
                    "key": "reps",
                    "type": "integer",
                    "status": "available",
                    "required": false,
                    "array": false,
                    "min": 0,
                    "max": 1000,
                    "default": null
                },
                {
                    "key": "link",
                    "type": "string",
                    "status": "available",
                    "required": true,
                    "array": false,
                    "format": "url",
                    "default": null
                }
            ],
            "indexes": []
        }
    ]
}
```
