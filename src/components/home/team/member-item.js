const TeamMemberCard = ({member}) => {
    return (
      <div className="p-6 bg-white shadow-md rounded-lg">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
        <p className="text-gray-700 mb-2">
          <strong>Education:</strong> {member.education}
        </p>
        <p className="text-gray-700 mb-2">
          <strong>Skills:</strong> {member.skills?.join(", ")}
        </p>
        <p className="text-gray-700 mb-2">
          <strong>Soft Skills:</strong> {member.softSkills?.join(", ")}
        </p>
        <div className="text-gray-700 mb-2">
          <strong>Experience:</strong>
          <ul className="list-disc list-inside">
            {member.experience.map((exp, expIndex) => (
              <li key={expIndex}>{exp}</li>
            ))}
          </ul>
        </div>
        <div className="mt-4">
          <p className="text-gray-700">
            <strong>Email:</strong> {member.contact.email}
          </p>
        </div>
      </div>
    );
  };
  
  export default TeamMemberCard