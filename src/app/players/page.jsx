"use client";
import React from "react";
import { Suspense } from "react";
import PlayersSearchPage from "../components/ui/fullSearchPages/PlayersSearchPage";

const PlayersPage = () => {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <PlayersSearchPage />
    </Suspense>
  );
};

export default PlayersPage;
