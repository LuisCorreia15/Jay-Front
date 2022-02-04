import api from "./index";

export const doGetAllProjects = async (
  searchedProject,
  setStudiesAndProjects,
  studiesAndProjects,
  setProjects,
  fileLocation
) => {
  return await api
    .get(`/project?search=${searchedProject}`)
    .then((res) => {
      const response = res.data.projects;
      setProjects(response);
      const tempArray = studiesAndProjects;
      response.forEach((res) => {
        res.type = "project";
        tempArray.push(res);
      });
      setStudiesAndProjects([...tempArray]);
    })
    .catch((error) =>
      console.log(
        "Error: " +
          error.message +
          "\n" +
          `Location: ${fileLocation} => doGetAllProject()`
      )
    );
};
