"use client";
import React from "react";
import { Suspense } from "react";
import EventsSearchPage from "../components/ui/fullSearchPages/EventSearchPage";

const EventsPage = () => {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <EventsSearchPage />
    </Suspense>
  )
};

export default EventsPage;
