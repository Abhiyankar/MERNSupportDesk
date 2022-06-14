const path = require('path')
const express = require('express')
const dotenv = require('dotenv').config()
const colors = require('colors')
const {errorHandler} = require('./middleware/errorMiddleware')
const PORT=process.env.PORT || 5000
const connectDB = require('./config/db')


connectDB()

const app=express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))

// app.get('/',(req,res)=>{
//     res.status(200).json({ message: 'Welcome to support desk API'})
// })

app.use('/api/users',require('./routes/userRoutes'))
app.use('/api/tickets',require('./routes/ticketRoutes'))

if(process.env.NODE_ENV === 'production')
{
    app.use(express.static(path.join(__dirname,'../frontend/build')))

    app.get('*',(req,res)=>res.sendFile(__dirname,'../','frontend','build','inndex.html'))
} else {
    app.get('/',(req,res)=>{
        res.status(200).json({ message: 'Welcome to support desk API'})
    })
}

app.use(errorHandler)

app.listen(PORT, ()=> console.log(`server started on port ${PORT}`))
