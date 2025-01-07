import React, { useState } from "react";
import axios from "axios";
import EditRecipeModal from "./EditRecipeModal";
import { Link } from "react-router-dom";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";
import { toast } from "react-toastify";
import { Draggable } from "@hello-pangea/dnd";


const RecipeItem = ({ recipe, onDelete, onUpdate, onSelect, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isSelected, setIsSelected] = useState(false);

  const handleSelect = (e) => {
    setIsSelected(e.target.checked);
    onSelect(recipe, e.target.checked);
  };


  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3001/recipes/${recipe.id}`);
      onDelete(recipe.id);
      toast.success("Recipe deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete recipe. Please try again.");
      console.error("Failed to delete recipe:", error);
    }
  };

  const handleUpdate = async (updatedRecipe) => {
    try {
      const response = await axios.put(
        `http://localhost:3001/recipes/${recipe.id}`,
        updatedRecipe
      );
      onUpdate(response.data);
      toast.success("Recipe updated successfully!");
    } catch (error) {
      toast.error("Failed to update recipe. Please try again.");
      console.error("Failed to update recipe:", error);
    }
  };

  return (
    <Draggable draggableId={recipe.id.toString()} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow relative h-48 ${
            snapshot.isDragging ? "opacity-70" : ""
          }`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold underline text-blue-400">
              <Link to={`/recipes/${recipe.id}`}>
                {recipe.title.length > 20
                  ? recipe.title.slice(0, 20) + "..."
                  : recipe.title}
              </Link>
            </h2>
            <input
              type="checkbox"
              checked={isSelected}
              onChange={handleSelect}
              className="h-4 w-4"
            />
          </div>
          <p className="text-sm text-gray-500">
            {recipe.description.length > 50
              ? recipe.description.slice(0, 50) + "..."
              : recipe.description}
          </p>
          <div className="mt-2">
            <span className="text-xs font-medium px-2 py-1 rounded bg-indigo-100 text-indigo-800">
              {recipe.difficulty}
            </span>
          </div>
          <p className="text-xs text-gray-400 mt-2">
            Last Updated: {new Date(recipe.lastUpdated).toLocaleString()}
          </p>

          {isHovered && (
            <div className="mt-2 flex gap-2">
              <button
                onClick={() => setIsEditing(true)}
                className="px-2 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Edit
              </button>
              <button
                onClick={() => setIsDeleteDialogOpen(true)}
                className="px-2 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          )}

          <EditRecipeModal
            open={isEditing}
            onClose={() => setIsEditing(false)}
            recipe={recipe}
            onUpdate={handleUpdate}
          />

          <Dialog
            open={isDeleteDialogOpen}
            onClose={() => setIsDeleteDialogOpen(false)}
            aria-labelledby="delete-confirmation-title"
            aria-describedby="delete-confirmation-description"
          >
            <DialogTitle id="delete-confirmation-title">
              Confirm Delete
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="delete-confirmation-description">
                Are you sure you want to delete the recipe titled{" "}
                <strong>{recipe.title}</strong>? This action cannot be undone.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={() => setIsDeleteDialogOpen(false)}
                variant="outlined"
              >
                Cancel
              </Button>
              <Button onClick={handleDelete} variant="contained" color="error">
                Delete
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      )}
    </Draggable>
  );
};

export default RecipeItem;
