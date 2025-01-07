import teamMembers from "../../../utils/data/teamMembers.json";
import TeamMembeCard from "./member-item";

const Projects = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h2 className="text-3xl font-semibold text-center mb-8">Team Members</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {teamMembers.map((member, index) => (
          <TeamMembeCard member={member} key={index} />
        ))}
      </div>
    </div>
  );
};

export default Projects;
