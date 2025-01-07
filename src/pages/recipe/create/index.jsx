import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { FaTrash } from "react-icons/fa";
import { MdEdit } from "react-icons/md";

const RecipeForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [ingredient, setIngredient] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [step, setStep] = useState("");
  const [steps, setSteps] = useState([]);
  const [tag, setTag] = useState("");
  const [tags, setTags] = useState([]);
  const [difficulty, setDifficulty] = useState("Easy");


  const addIngredient = () => {
    if (ingredient.trim()) {
      setIngredients([...ingredients, ingredient.trim()]);
      setIngredient("");
    }
  };

  const addStep = () => {
    if (step.trim()) {
      setSteps([...steps, step.trim()]);
      setStep("");
    }
  };

  const addTag = () => {
    if (tag.trim()) {
      setTags([...tags, tag.trim()]);
      setTag("");
    }
  };


  const editIngredient = (index) => {
    setIngredient(ingredients[index]);
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  const editStep = (index) => {
    setStep(steps[index]);
    setSteps(steps.filter((_, i) => i !== index));
  };

  const editTag = (index) => {
    setTag(tags[index]);
    setTags(tags.filter((_, i) => i !== index));
  };


  const removeIngredient = (index) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  const removeStep = (index) => {
    setSteps(steps.filter((_, i) => i !== index));
  };

  const removeTag = (index) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newRecipe = {
      title,
      description,
      ingredients,
      steps,
      tags,
      difficulty,
      lastUpdated: new Date().toISOString(),
    };

    try {
      await axios.post("http://localhost:3001/recipes", newRecipe);
      toast("Recipe created successfully!", { type: "success" });
      resetForm();
    } catch (error) {
      console.error("Error creating recipe:", error);
    }
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setIngredient("");
    setIngredients([]);
    setStep("");
    setSteps([]);
    setTag("");
    setTags([]);
    setDifficulty("Easy");
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-5 border border-ingigo-200">
      <h2 className="text-2xl font-bold mb-4 text-center">
        Create a New Recipe
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Ingredients
          </label>
          <div className="flex space-x-2 mt-1">
            <input
              type="text"
              value={ingredient}
              onChange={(e) => setIngredient(e.target.value)}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2"
            />
            <button
              type="button"
              onClick={addIngredient}
              className="px-3 py-2 bg-indigo-500 text-white rounded-md shadow-sm hover:bg-indigo-600"
            >
              Add
            </button>
          </div>
          <div className="mt-2 space-y-1">
            {ingredients.map((item, index) => (
              <div
                key={index}
                className="flex justify-between items-center bg-indigo-100 text-indigo-800 px-3 py-1 rounded-lg"
              >
                <span>{item}</span>
                <div className="space-x-2">
                  <button
                    type="button"
                    onClick={() => editIngredient(index)}
                    className="text-blue-600 hover:underline"
                  >
                    <MdEdit />
                  </button>
                  <button
                    type="button"
                    onClick={() => removeIngredient(index)}
                    className="text-red-600 hover:underline"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Preparation Steps
          </label>
          <div className="flex space-x-2 mt-1">
            <input
              type="text"
              value={step}
              onChange={(e) => setStep(e.target.value)}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2"
            />
            <button
              type="button"
              onClick={addStep}
              className="px-3 py-2 bg-indigo-500 text-white rounded-md shadow-sm hover:bg-indigo-600"
            >
              Add
            </button>
          </div>
          <div className="mt-2 space-y-1">
            {steps.map((item, index) => (
              <div
                key={index}
                className="flex justify-between items-center bg-green-100 text-green-800 px-3 py-1 rounded-lg"
              >
                <span>{item}</span>
                <div className="space-x-2">
                  <button
                    type="button"
                    onClick={() => editStep(index)}
                    className="text-blue-600 hover:underline"
                  >
                    <MdEdit />
                  </button>
                  <button
                    type="button"
                    onClick={() => removeStep(index)}
                    className="text-red-600 hover:underline"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Tags
          </label>
          <div className="flex space-x-2 mt-1">
            <input
              type="text"
              value={tag}
              onChange={(e) => setTag(e.target.value)}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2"
            />
            <button
              type="button"
              onClick={addTag}
              className="px-3 py-2 bg-indigo-500 text-white rounded-md shadow-sm hover:bg-indigo-600"
            >
              Add
            </button>
          </div>
          <div className="mt-2 space-y-1">
            {tags.map((item, index) => (
              <div
                key={index}
                className="flex justify-between items-center bg-yellow-100 text-yellow-800 px-3 py-1 rounded-lg"
              >
                <span>{item}</span>
                <div className="space-x-2">
                  <button
                    type="button"
                    onClick={() => editTag(index)}
                    className="text-blue-600 hover:underline"
                  >
                    <MdEdit />
                  </button>
                  <button
                    type="button"
                    onClick={() => removeTag(index)}
                    className="text-red-600 hover:underline"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Difficulty Level
          </label>
          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2"
          >
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="px-6 py-3 bg-indigo-500 text-white rounded-lg shadow-md hover:bg-indigo-600"
          >
            Create Recipe
          </button>
        </div>
      </form>
    </div>
  );
};

export default RecipeForm;
