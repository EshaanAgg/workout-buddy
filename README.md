# 🔖 Assignment Hero

Made with Nuxt 3 and Appwrite

If you simply want to try out the App, go ahead and check out the demo at https://appwrite-todo-with-vue.vercel.app/

## 🎬 Getting Started

### 🤘 Install Appwrite

Follow the simple [Installation Guide](https://appwrite.io/docs/installation) to get Appwrite up and running in no time. You can either deploy Appwrite on your local machine or, on any cloud provider of your choice.

> Note: If you setup Appwrite on your local machine, you will need to create a public IP so that your hosted frontend can access it.

We need to make a few configuration changes to your Appwrite server.

1. Add a new Web App in Appwrite and enter the endpoint of your website (`localhost, <project-name>.vercel.app etc`)
   ![Appwrite Console](https://user-images.githubusercontent.com/31401437/155891052-09bb17e4-a30c-4c73-8c9f-b1cc0b44c596.png)

2. Create a new collection with the following properties

- **Attributes**
  Add the following attributes to the collection.
  > Make sure that your Attribute ID exactly matches the key in the images

<p align="center">
<img src="https://user-images.githubusercontent.com/31401437/155890880-d4e46483-e2cc-4d06-b527-7c6d9f8a152f.png" alt="Content Attribute" width="400">
</p>

<p align="center">
<img src="https://user-images.githubusercontent.com/31401437/155890899-e8ac0ef9-a0e2-4bde-add8-caee55a02e6b.png" alt="IsComplete Attribute" width="400">
</p>

- **Permissions**
  Add the following permissions to your collection. These permissions ensure that only registered users can access the collection.

<p align="center">
<img src="https://user-images.githubusercontent.com/31401437/155890959-c9e6bdd6-b6b6-4ae5-8680-3c6aeea716ef.png" alt="Collection Permissions" width="400">
</p>

### 🚀 Deploy the Front End

You have two options to deploy the front-end and we will cover both of them here. In either case, you will need to fill in these environment variables that help your frontend connect to Appwrite.

- VITE_APP_ENDPOINT - Your Appwrite endpoint
- VITE_APP_PROJECT - Your Appwrite project ID
- VITE_APP_COLLECTION_ID - Your Appwrite collection ID
- VITE_APP_DATABASE_ID - Your Appwrite database ID

### **Deploy to a Static Hosting Provider**

Use the following buttons to deploy to your favourite hosting provider in one click! We support Vercel, Netlify and DigitalOcean. You will need to enter the environment variables above when prompted.

> Note: Vercel is unable to auto detect the framework so please use the Vue Framework in case of vercel.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/git/external?repository-url=https%3A%2F%2Fgithub.com%2Fappwrite%2Ftodo-with-vue&env=VITE_APP_ENDPOINT,VITE_APP_PROJECT,VITE_APP_COLLECTION_ID&envDescription=Your%20Appwrite%20Endpoint%2C%20Project%20ID%20and%20Collection%20ID%20)

[![Deploy to Heroku](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/appwrite/demo-todo-with-vue)

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/appwrite/todo-with-vue)

[![Deploy to DO](https://www.deploytodo.com/do-btn-blue.svg)](https://cloud.digitalocean.com/apps/new?repo=https://github.com/appwrite/todo-with-vue/tree/main)

### **Run locally**

Follow these instructions to run the demo app locally

```sh
$ git clone https://github.com/appwrite/todo-with-vue
$ cd todo-with-vue
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

## 🤕 Support

If you get stuck anywhere, hop onto one of our [support channels in discord](https://appwrite.io/discord) and we'd be delighted to help you out 🤝

## 😧 Help Wanted

Our access credentials were recently compromised and someone tried to ruin these demos. They decided to leave behind 15 easter eggs 🥚 for you to discover. If you find them, submit a PR cleaning up that section of the code (One PR per person across all the repos). You can track the number of claimed Easter Eggs using the badge at the top.

The first 15 people to get their PRs merged will receive some Appwrite Swags 🤩 . Just head over to our [Discord channel](https://appwrite.io/discord) and share your PR link with us.

> _UPDATE **17-11-2021**:_ The easter egg contest is now closed.
