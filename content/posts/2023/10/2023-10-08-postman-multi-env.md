---
title: Organizing Postman collection for multi-env project
description: How to setup Postman collection for project deployed to multiple environments
slug: postman-multi-env
category: pm
datePublished: 2023-10-08T00:00:00.000Z
tags: [beginner, api, postman]
---

This is a small post about how to organize Postman collection for multi-env project.

Imagine you have a project that is deployed to multiple environments. For example, a project is deployed to dev, test, and prod environments.
You want to make requests to your API endpoints in all environments easily. I often see next solution to make same request to different environments via Postman:

![Example of bad collection organization](https://raw.githubusercontent.com/rodion-arr/blog/main/content/images/2023/10/postman-multi-env/1.png)

People often duplicate the same endpoint entry in Postman per environment. This solution is not convenient because in case some changes were made to `/endpoint` API - you need to update all copies of it in Postman to be aligned.

The better solution is to use Postman variables. You can create a variable for each environment and use it in the request URL. For example, you can create a `{{host}}` variable and set its value to `http://localhost:3000` for the local environment and use real URLs for deployed environments.

This allows you to have 1 entry per API and by choosing the target environment from the list you can make same request to different environments without duplication.

Let's see how to do it step by step:

1. You need to open `Environment` tab and create a new setting for each environment you have. You can start from creating `Local` environment and adding `host` variable with localhost value:

    ![Example of bad collection organization](https://raw.githubusercontent.com/rodion-arr/blog/main/content/images/2023/10/postman-multi-env/2.png)

1. Then you need to select `Local` in environments list in the top right corner. You can remove duplicated requests entries now and update request URL for the last one `/endpoint` request. You need to replace `http://localhost:3000` with `{{host}}` in the request URL.

    ![Example of bad collection organization](https://raw.githubusercontent.com/rodion-arr/blog/main/content/images/2023/10/postman-multi-env/3.png)

1. After adding all other environments where your application deployed to - you can select any environment from the list and make requests conveniently maintaining only one entry per API in Postman.
