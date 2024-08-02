"use client";
import React from "react";
import { Suspense } from "react";
import TeamsSearchPage from "../components/ui/fullSearchPages/TeamsSearchPage";

const TeamsPage = () => {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <TeamsSearchPage />
    </Suspense>
  )
};

export default TeamsPage;
