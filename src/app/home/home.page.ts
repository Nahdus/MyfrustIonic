import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
percent:number = 0
radius:number = 100

fullTime:any =  "00:01:30"
timer:any=false
progress:any =0
minutes:number=1
seconds:any=30
elapsed:any={
  h:"00",
  m:"00",
  s:"00"
}
overallTimer:any=false
startTimer(){
  if(this.timer){
    clearInterval(this.timer)
  }
  if(!this.overallTimer){
    this.progressTimer()
  }

  this.timer=false
  this.percent = 0
  this.progress = 0
  let timeSplit= this.fullTime.split(":")
  this.minutes=timeSplit[1]
  this.seconds=timeSplit[2]
  let totalSeconds = Math.floor(this.minutes *60)+parseInt(this.seconds)
  this.timer=setInterval(()=>{
    if(this.percent===this.radius){
      clearInterval(this.timer)
    }
    this.percent=Math.floor((this.progress/totalSeconds)*100)
    this.progress++
  },1000)
}
stopTimer(){
  clearInterval(this.timer)
  clearInterval(this.overallTimer)
  this.overallTimer=false
  this.timer=false
  this.percent=0
  this.elapsed={
    h:"00",
    m:"00",
    s:"00"
  }

}
progressTimer(){
  
  let now = new Date().getTime()
  this.overallTimer =setInterval(()=>{
    let countDownDate= new Date()
    let distance=countDownDate.getTime()-now
    // console.log(countDownDate.getTime())
    // console.log(distance)
    this.elapsed.h=Math.floor((distance%(1000*60*60*24))/(1000*60*60))
    this.elapsed.m=Math.floor((distance%(1000*60*60))/(1000*60))
    this.elapsed.s=Math.floor((distance%(1000*60)/1000))
    Object.keys(this.elapsed).forEach((k)=>
      
      this.elapsed[k]=this.pad(this.elapsed[k],2)
    )

  },1000)
}
pad(num:any,size:number){
  let s = num+"";
  while(s.length<size)s="0"+s
  return s
}
//insomnia
}
