import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { useState, useEffect } from "react";
import { useModal } from "../../context/ModalContext";

export function useGitHubRepos(username) {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchRepos = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://api.github.com/users/${username}/repos`,
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch repositories: ${response.status}`);
        }

        const data = await response.json();

        if (isMounted) {
          setRepos(data);
          setLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message);
          setLoading(false);
        }
      }
    };

    fetchRepos();

    return () => {
      isMounted = false;
    };
  }, [username]);

  return { repos, loading, error };
}

export function ProjectCard({ project }) {
  const { openModal } = useModal();

  const handleViewDetails = () => {
    openModal({
      title: project.name,
      content: project.description || "No description available",
    });
  };

  return (
    <article className="card">
      <div className="card-header">
        <img
          src="https://picsum.photos/100/200"
          alt={`Repository: ${project.name}`}
          loading="lazy"
        />
      </div>

      <div className="card-body">
        <h3>{project.name}</h3>
        <p>Language: {project.language || "Unknown language"}</p>
        <p>{project.description || "No description available"}</p>
      </div>

      <div className="card-footer">
        <a
          href={project.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="btn"
          aria-label={`View GitHub repository for ${project.name}`}
        >
          <FontAwesomeIcon icon={faGithub} /> View Repository
        </a>

        <button
          onClick={handleViewDetails}
          className="btn"
          aria-label={`View details about ${project.name}`}
        >
          View Details
        </button>
      </div>
    </article>
  );
}

export default function ProjectList({ username = "RasmusWenngren" }) {
  const { repos, loading, error } = useGitHubRepos(username);

  if (loading) {
    return (
      <div className="loading-container" aria-live="polite">
        <p>Loading projects...</p>
        <div
          className="loader"
          role="status"
          aria-label="Loading projects"
        ></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container" role="alert">
        <p>Error loading projects: {error}</p>
        <p>Please try again later or check the GitHub username.</p>
      </div>
    );
  }

  return (
    <>
      {repos.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </>
  );
}
