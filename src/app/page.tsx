import React from "react";
import {DbService} from "@/services/db.service";

export default async function Home() {
  const postsMeta = await DbService.getPostsMeta();

  return <div>
  </div>;
}
