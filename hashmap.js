

function Hashmap(){
let capacity = 16
let a = new Array(capacity)
const loadFactor = 0.75
let counter = 0

class Node{
    constructor(key,value){
        this.key=key
        this.value=value
        this.next=null
    }
}


function hash(key){
    let hashCode = 0
    let primeNumber = 7

    for(let i = 0 ; i < key.length ; i++){
        hashCode =( primeNumber*hashCode+key.charCodeAt(i))%capacity
    }

    return hashCode
}

function set(key,value){
    
    const hashCode = hash(key)

    if(!a[hashCode]){
        a[hashCode]=new Node(key,value)
    } else{
        let current=a[hashCode]
        let prev = null
        while(current){
            if(current.key===key){
                current.value=value
                return
            }
            prev=current
            current=current.next
        }
        prev.next = new Node(key,value)
    }
    counter++
    if(counter>(loadFactor*capacity)){
        resize()
    }
}

function resize(){

    let oldCapacity = capacity

    const MAX_CAPACITY = 1e6
    capacity=Math.min(capacity*2,MAX_CAPACITY)
    if(isNaN(capacity)||capacity<=0){
        capacity=16
    }
    const oldArray = a
    a = new Array(capacity)
    counter=0

   for(let i = 0;i<oldCapacity;i++){
    let current = oldArray[i]
    while(current){
        set(current.key,current.value)
        current=current.next
    }
   }


}

function get(key){
    const hashCode = hash(key)
    let current = a[hashCode]
    while(current){
        if(current.key===key)
            return current.value
        current=current.next
    }
    return null
    /*get(key) takes one argument as a key and returns the value that is assigned to this key. If a key is not found, return null.*/
}

function has(key){

    return get(key)!==null
    /*has(key) takes a key as an argument and returns true or false based on whether or not the key is in the hash map.

*/
}

function remove(key){
    // remove(key) takes a key as an argument. If the given key is in the hash map, it should remove the entry with that key and return true. If the key isn’t in the hash map, it should return false.
    let hashCode=hash(key)
    let current = a[hashCode]
    let prev = null
    while(current){
        if(current.key===key){
            if(prev===null){
                a[hashCode]=current.next
            }else{
                prev.next=current.next
            }
            counter--
            return true
        }
        prev=current
        current=current.next
    }
    return false
}

function length(){
    // length() returns the number of stored keys in the hash map.
    return counter
}

function clear(){

    // clear() removes all entries in the hash map.
    a = new Array(16)
    counter=0

}

function keys(){
    // keys() returns an array containing all the keys inside the hash map.
    const allKeys = [];
    for(let i =0;i<capacity;i++){
        let current=a[i]
        while(current){
            allKeys.push(current.key)
            current=current.next
        }
    }
    return allKeys
}

function values(){
    const allValues= [];
    for(let i =0;i<capacity;i++){
        let current=a[i]
        while(current){
            allValues.push(current.value)
            current=current.next
        }
    }
    return allValues
}

function entries(){

    // entries() returns an array that contains each key, value pair. Example: [[firstKey, firstValue], [secondKey, secondValue]]
    const allEntries= [];
    for(let i =0;i<capacity;i++){
        let current=a[i]
        while(current){
            allEntries.push([current.key,current.value])
            current=current.next
        }
    }
    return allEntries
}


return {set,get,has,remove,length,clear,keys,values,entries}
}


const test =  Hashmap()

test.set('apple', 'red')
test.set('banana', 'yellow')
test.set('carrot', 'orange')
test.set('dog', 'brown')
test.set('elephant', 'gray')
test.set('frog', 'green')
test.set('grape', 'purple')
test.set('hat', 'black')
test.set('ice cream', 'white')
test.set('jacket', 'blue')
test.set('kite', 'pink')
test.set('lion', 'golden')

console.log(test.entries())

test.set('lion','red')
test.set('moon','silvvr')

test.set('hat', 'white')
test.set('ice cream', 'yellow')
test.set('jacket', 'purple')

console.log(test.get('kite'))
console.log(test.remove('grape'))
console.log(test.length())
console.log(test.clear())
console.log(test.entries())