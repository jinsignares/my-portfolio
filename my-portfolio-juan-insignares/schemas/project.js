export default {
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    {
      name: "title",
      title: "Title",
      description: "Title of the project",
      type: "string",
    },
    {
      name: "image",
      title: "Image",
      type: "image",
      options: {
        hotspot: true,
      }
    },
    {
      name: "technologies",
      title: "Technologies",
      type: "array",
      of: [{ type: "reference", to: { type: "skill" } }]
    },
    {
      name: "summary",
      title: "Summary",
      type: "string",
    },
    {
      name: "phase",
      title: "Phase",
      type: "string",
    },
    {
      name: "linkToBuild",
      title: "LinkToBuild",
      type: "url"
    },
    {
      name: "dateStarted",
      title: "DateStarted",
      type: "date",
    },
    {
      name: "dateEnded",
      title: "DateEnded",
      type: "date",
    },
    {
      name: "isCurrentlyWorkingOn",
      title: "IsCurrentlyWorkingOn",
      type: "boolean",
    },
  ]
}
