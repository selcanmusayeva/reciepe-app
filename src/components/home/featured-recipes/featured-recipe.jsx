import useFetch from "../../../hooks/useFetch";
import RecipeItem from "./RecipeItem";

const Featured = () => {
  const {
    data: recipes,
    loading,
    error,
  } = useFetch(
    "http://localhost:3001/recipes?_sort=lastUpdated&_order=desc&_limit=3"
  );

  console.log(recipes);

  return (
    <section className="mb-12">
      <h2 className="text-3xl font-semibold mb-8">Top 3 Featured Recipe</h2>

      {loading && <p>Loading featured recipe...</p>}
      {error && (
        <p className="text-red-500">Error fetching recipe: {error.message}</p>
      )}

      {recipes && recipes.length > 0 ? (
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {recipes.map((recipe) => {
            return <RecipeItem key={recipe.id} recipe={recipe} />;
          })}
        </div>
      ) : (
        !loading && <p>No recipes available.</p>
      )}
    </section>
  );
};

export default Featured;
