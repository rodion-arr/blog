---
title: How to validate nested objects in Nest.js
description: This post will show examples nested objects validation in Nest.js
slug: validate-nested-objects-nestjs
category: backend
datePublished: 2023-09-30T00:00:00.000Z
tags: [intermediate, nestjs, nodejs, typescript, backend, api, validation]
---

It is a common task to receive complex objects as input to our APIs and of course we must validate these objects. In this post we will review few examples of how to validate complex objects in Nest.js APIs via DTO files and `ValidationPipe` and underlying `class-validation` package.

Unfortunately neither Nest.js nor `class-validator` documentations still have a comprehensive examples of how we can validate more complex requests containing, for example, nested objects, array of objects or conditional validation logic. This may require developers to do a lot tries and fails in order to find correct decorators to make it work. Let's review some common examples that I've faced in Nest.js projects and see how they can be validated.

## Prerequisites

At the time of this post - Nest.js had version 

>nest new validation