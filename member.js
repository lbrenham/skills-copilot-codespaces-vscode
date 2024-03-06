function skillsMember() {
  return {
    name: 'skillsMember',
    type: 'member',
    description: 'A member of the skills object',
    fields: {
      id: {
        type: 'ID',
        description: 'The ID of the skill'
      },
      name: {
        type: 'String',
        description: 'The name of the skill'
      },
      description: {
        type: 'String',
        description: 'The description of the skill'
      },
      level: {
        type: 'String',
        description: 'The level of the skill'
      }
    }
  };
}