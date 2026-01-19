// // for loop 1 to 10
// for ( i=1; i<=10; i++){
//     console.log(i)
// }
// // for loop even number
// for (i=1; i<=50; i++){
//     if(i%2===0){
//         console.log(i)
//     } 
// }
// // for loop odd number
// for (i=1; i<=50; i++){
//     if(i%2!==0){
//         console.log(i)
//     }
// }
// // for loop reverce number
// for(i=10; i>=1; i--){
// console.log(i)
// }


// Write a JavaScript program to reverse a string without using built-in methods.

// let letter = "surya"
// let reverseLetter = []
// for(i=0; i===letter.length; i++ ){

// }


for(i=1; i<=4; i++ ){
    let row = ""
    for(j=1; j<=i; j++ ){
        row+=j+" "  
    }
    console.log(row)
}

for(i=1; i<=4; i++){
    let row = ""
    for(j=1; j<=i; j++){
        row+=i+" "
        
    }
    console.log(row)
}
for(i=1; i<=4; i++){
    let row = ""
    for(k=4; k>=i; k--){
        row+=" "         
    } 
    for(j=1; j<=i; j++){
        row+="* "         
    } 
    console.log(row) 
}

for(i=4; i>=1; i--){
    let row = ""
    for(k=1; k>i; k--){
        for(j=1; j<=i; j++){
        row+="* "         
    } 
        row+=" "         
    }
    
    console.log(row) 
}