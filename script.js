const allCheckbox = document.querySelectorAll('.castom-checbox') 
const inputsAll = document.querySelectorAll('.goal-input')
const error = document.querySelector('.error')
const progressBar = document.querySelector('.progerss-bar')
const progerssValue = document.querySelector('.progerss-value')
const progresslabel = document.querySelector('.progresslabel')

const allQuotes = ['Raise the bar by completing your goals!',
    'Well begun is half done!',
    'Just a step away, keep going!',
    'Whoa! You just completed all the goals, time for chill :D'
]

const allGoals = JSON.parse(localStorage.getItem('allGoals')) || {
    first: {
        Name:'',
        Completed: false
    },
    second: {
        Name:'',
        Completed: false
    },
    third: {
        Name:'',
        Completed: false
    },
}
let completedGoalsCount = Object.values(allGoals).filter((goal)=> goal.completed ).length
progerssValue.style.width = `${completedGoalsCount / 3 *100}%`
progerssValue.firstElementChild.innerText = `${completedGoalsCount}/3 Completed`
progresslabel.innerText = allQuotes[completedGoalsCount]

allCheckbox.forEach((checkbox) =>{
    checkbox.addEventListener('click',(e) => {
       const arrInputsAll =[...inputsAll].every(function(input){
        return input.value 
       })

       if (arrInputsAll) {
        checkbox.parentElement.classList.toggle('completed')
        const inputId =checkbox.nextElementSibling.id
        allGoals[inputId].completed = !allGoals[inputId].completed
        completedGoalsCount = Object.values(allGoals).filter((goal)=> goal.completed ).length
        progerssValue.style.width = `${completedGoalsCount / 3 *100}%`
        progerssValue.firstElementChild.innerText = `${completedGoalsCount}/3 Completed`
        progresslabel.innerText = allQuotes[completedGoalsCount]
        localStorage.setItem('allGoals',JSON.stringify(allGoals) )
       
        
       }
       else{
         progressBar.classList.add('show-error')
       }

    })
})

inputsAll.forEach((input) => {
    input.value =  allGoals[input.id].Name
    
     if (allGoals[input.id].completed){
        input.parentElement.classList.add('completed')
     }
    
    
    input.addEventListener('input' , (e) => {
        if (allGoals[input.id].completed){
            e.target.value = allGoals[input.id].Name
            return
         }
        allGoals[input.id] = {
            Name: input.value,
            completed: false,
        }
        
        localStorage.setItem('allGoals',JSON.stringify(allGoals) )
        
    })
    
    input.addEventListener('focus', () => {
        progressBar.classList.remove('show-error')
    })

})
