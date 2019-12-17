const userModel = (() => {
  const users = [
    {
      id: '001',
      name: '館長',
      following: ['003', '005']
    },
    {
      id: '002',
      name: '統神',
      following: ['003', '004']
    },
    {
      id: '003',
      name: '蔡阿嗄',
      following: ['001', '002', '004', '005', '006']
    },
    {
      id: '004',
      name: '魯蛋',
      following: ['001', '005']
    },
    {
      id: '005',
      name: 'pewdiepie',
      following: ['002', '003', '006']
    },
    {
      id: '006',
      name: 'aRuFa',
      following: ['001', '002', '003', '005']
    }
  ]

  const genPromise = (value, text) =>
    new Promise(resolve => {
      setTimeout(() => {
        console.log(text)
        return resolve(value)
      }, 100)
    })

  return {
    getUserById: id =>
      genPromise(users.find(user => user.id === id), `getUserById: ${id}`),
    getUserByName: name =>
      genPromise(
        users.find(user => user.name === name),
        `getUserByName: ${name}`
      ),
    getUsersByIds: ids =>
      genPromise(
        users.filter(user => ids.includes(user.id)),
        `getUsersByIds: ${ids}`
      ),
    getAllUsers: () => genPromise(users, 'getAllUsers')
  }
})()

module.exports = userModel
