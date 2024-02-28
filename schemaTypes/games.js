export default {
  name: 'games', //navnet på dokumentet
  type: 'document',
  title: 'Games', //det som vises på nettsiden

  fields: [
    // alle datafeltene du skal ha i et dokument
    {
      name: 'name',
      type: 'string',
      title: 'Name of game',
    },
    {
      name: 'year',
      type: 'number',
      title: 'Year',
    },
    {
      name: 'company',
      type: 'object',
      fields: [
        {
          name: 'companyName',
          type: 'reference',
          to: [{type: 'companies'}],
        },
      ],
    },
    {
      name: 'gameType',
      type: 'array',
      of: [
        {
          name: 'gameType',
          type: 'reference',
          to: [{type: 'gameTypes'}],
        },
      ],
    },
    {
      name: 'Console',
      type: 'string',
      title: 'Type of console',
    },
  ],
}
