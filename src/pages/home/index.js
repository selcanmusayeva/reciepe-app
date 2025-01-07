import React from "react";
import Projects from "../../components/home/team/projects";
import FeaturedRecipes from "../../components/home/featured-recipes/featured-recipe";

const index = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold text-blue-600 mb-4">
          Welcome to the Recipe Manager App
        </h1>
        <p className="text-lg text-gray-700">
          Manage, organize, and discover new recipes easily. Create, edit, and
          explore your favorite recipes!
        </p>
      </header>

      <FeaturedRecipes />

      <Projects />
    </div>
  );
};

export default index;
