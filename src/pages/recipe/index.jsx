import React, { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import RecipeItem from "./components/RecipeItem";
import { Link } from "react-router-dom";
import { useDebounce } from "use-debounce";
import { toast } from "react-toastify";
import TablePagination from "@mui/material/TablePagination";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";

const MainPage = () => {
  const url = "http://localhost:3001/recipes";
  const [searchQuery, setSearchQuery] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [sortBy, setSortBy] = useState("lastUpdated");
  const [recipes, setRecipes] = useState([]);
  const [debouncedQuery] = useDebounce(searchQuery, 750);
  const [selectedRecipes, setSelectedRecipes] = useState([]);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);


  const handleChangePage = (event, newPage) => {
    setPage(newPage+1);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  let query = `?_sort=${sortBy}&_order=desc`;
  if (difficulty) query += `&difficulty=${encodeURIComponent(difficulty)}`;
  if (debouncedQuery)
    query += `?title_like=${encodeURIComponent(debouncedQuery)}`;

  const { data, loading, error, totalItems } = useFetch(url + query, page, rowsPerPage);



  const oneEditRecipe = (recipe) => {
    const updatedRecipes = recipes.map((r) =>
      r.id === recipe.id ? recipe : r
    );
    setRecipes(updatedRecipes);
  };

  const onDeleteRecipe = (id) => {
    const updatedRecipes = recipes.filter((recipe) => recipe.id !== id);
    setRecipes(updatedRecipes);
  };

  const handleSelectRecipe = (recipe, isSelected) => {
    if (isSelected) {
      setSelectedRecipes((prev) => [...prev, recipe]);
    } else {
      setSelectedRecipes((prev) => prev.filter((r) => r.id !== recipe.id));
    }
  };

  const handleShare = () => {
    if (selectedRecipes.length === 0) {
      toast.warn("No recipes selected to share!");
      return;
    }

    const recipeDetails = selectedRecipes
      .map(
        (recipe) =>
          `Title: ${recipe.title}\nDescription: ${
            recipe.description
          }\nIngredients: ${recipe.ingredients.join(
            ", "
          )}\nSteps: ${recipe.steps.join(", ")}\nDifficulty: ${
            recipe.difficulty
          }\nLast Updated: ${new Date(recipe.lastUpdated).toLocaleString()}`
      )
      .join("\n\n");


    window.open(
      `mailto:?subject=Shared Recipes&body=${encodeURIComponent(recipeDetails)}`
    );
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(recipes);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setRecipes(items);
  };

  useEffect(() => {
    if (data) {
      setRecipes(data.data);

    }
  }, [data]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Recipe List</h1>

      <div className="flex flex-col md:flex-row justify-between items-center gap-2 mb-6 space-y-4 md:space-y-0">
        <input
          type="text"
          placeholder="Search recipes..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full md:w-1/3 p-2 border rounded-md shadow-sm"
        />

        <select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
          className="w-full md:w-1/5 p-2 border rounded-md shadow-sm"
        >
          <option value="">All Difficulties</option>
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="w-full md:w-1/5 p-2 border rounded-md shadow-sm"
        >
          <option value="lastUpdated">Sort by Last Updated</option>
          <option value="difficulty">Sort by Difficulty</option>
        </select>
      </div>
      <div className="flex gap-x-2 mb-6">
        <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
          <Link to="/recipes/create" className="">
            Add Recipe
          </Link>
        </button>

        <button
          onClick={handleShare}
          className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
        >
          Share Selected
        </button>
      </div>

      {error && <p className="text-center text-red-500">{error}</p>}

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="recipes" direction="horizontal">
          {(provided) => (
            <div
              id="recipes"
              className="recipes grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {recipes.map((recipe, index) => (
                <RecipeItem
                  key={recipe.id}
                  recipe={recipe}
                  index={index}
                  onDelete={onDeleteRecipe}
                  onUpdate={oneEditRecipe}
                  onSelect={handleSelectRecipe}
                />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      <TablePagination
        component="div"
        count={totalItems}
        page={page-1}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[5,10,25]}
      />
    </div>
  );
};

export default MainPage;
