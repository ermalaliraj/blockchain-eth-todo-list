App = {
    loading: false,
    contracts: {},

    load: async () => {
        console.log("app loading...")
        await App.loadWeb3()
        await App.loadAccount()
        await App.loadContract()
        await App.render()
    },

    // https://medium.com/metamask/https-medium-com-metamask-breaking-change-injecting-web3-7722797916a8
    loadWeb3: async () => {
        if (typeof web3 !== 'undefined') {
            App.web3Provider = web3.currentProvider
            web3 = new Web3(web3.currentProvider)
        } else {
            window.alert("Please connect to Metamask.")
        }
        if (window.ethereum) {
            window.web3 = new Web3(ethereum)
            try {
                // Request account access if needed
                await ethereum.enable()
                // Accounts now exposed
                web3.eth.sendTransaction({/* ... */})
            } catch (error) {
                console.warn("User denied account access...")
            }
            console.log("Connected to the Metamask")
        } else if (window.web3) {  // Legacy browsers...
            App.web3Provider = web3.currentProvider
            window.web3 = new Web3(web3.currentProvider)
            web3.eth.sendTransaction({/* ... */})
            console.log("Old browser. Connected")
        } else {
            console.log('Non-Ethereum browser detected. You should consider trying MetaMask!')
        }
    },

    loadAccount: async () => {
        // Set the current blockchain account
        App.account = web3.eth.accounts[0]
        console.log("Account: " + App.account)
    },

    loadContract: async () => {
        // Create a JavaScript version of the smart contract
        const todoList = await $.getJSON('TodoList.json')
        console.log("todoList as json")
        console.log(todoList)

        App.contracts.TodoList = TruffleContract(todoList)
        App.contracts.TodoList.setProvider(App.web3Provider)

        // Hydrate the smart contract with values from the blockchain
        App.todoList = await App.contracts.TodoList.deployed()
    },

    render: async () => {
        // Prevent double render
        if (App.loading) {
            return
        }

        // Update app loading state
        App.setLoading(true)

        // Render Account
        $('#account').html(App.account)

        // Render Tasks
        await App.renderTasks()

        // Update loading state
        App.setLoading(false)
    },

    renderTasks: async () => {
        // Load the total task count from the blockchain
        const taskCount = await App.todoList.taskCount()
        console.log("taskCount: " + taskCount)
        const $taskTemplate = $('.taskTemplate')

        for (var i = 1; i <= taskCount; i++) {
            const task = await App.todoList.tasks(i)
            console.log("task[" + i + "]" + task)
            const taskId = task[0].toNumber()
            const taskContent = task[1]
            const taskCompleted = task[2]

            // Create the html for the task
            const $newTaskTemplate = $taskTemplate.clone()
            $newTaskTemplate.find('.content').html(taskContent)
            $newTaskTemplate.find('input')
                .prop('name', taskId)
                .prop('checked', taskCompleted)
                .on('click', App.toggleCompleted)

            // Put the task in the correct list
            if (taskCompleted) {
                $('#completedTaskList').append($newTaskTemplate)
            } else {
                $('#taskList').append($newTaskTemplate)
            }

            // Show the task
            $newTaskTemplate.show()
        }
    },

    createTask: async () => {
        web3.eth.defaultAccount = web3.eth.accounts[0];  // Solved: "Error: invalid address"  issue

        App.setLoading(true)
        const content = $('#newTask').val()
        console.log("Going to create a task in blockchain: " + content)
        await App.todoList.createTask(content)
        console.log("Task created")
        window.location.reload()
    },

    toggleCompleted: async (e) => {
        web3.eth.defaultAccount = web3.eth.accounts[0];

        App.setLoading(true)
        const taskId = e.target.name
        // task = await App.todoList.tasks(1)
        await App.todoList.toggleCompleted(taskId)
        // task = await App.todoList.tasks(1)
        // App.todoList.tasks(1).completed = !task
        // todoList.toggleCompleted(taskId)
        console.log("Toggle taskId: " + taskId)
        window.location.reload()
    },

    setLoading: (boolean) => {
        App.loading = boolean
        const loader = $('#loader')
        const content = $('#content')
        if (boolean) {
            loader.show()
            content.hide()
        } else {
            loader.hide()
            content.show()
        }
    }
}

$(() => {
    $(window).load(() => {
        App.load()
    })
})