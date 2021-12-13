class Enlarge{
    constructor(select,type = 'click'){
        this.ele = document.querySelector(select)
        this.show = this.ele.querySelector('.show')
        this.mask = this.show.querySelector('.mask')
        this.list = this.ele.querySelector('.list')
        this.enlarge = this.ele.querySelector('.enlarge')
        this.type = type

        this.change()
        this.click()
        this.moveout()
        this.move()
    }

    change(){
        this.enlarge.style.width = parseInt(window.getComputedStyle(this.mask)['width']) * parseInt(window.getComputedStyle(this.enlarge.firstElementChild)['width']) / this.show.clientWidth + 'px'
        this.enlarge.style.height = parseInt(window.getComputedStyle(this.mask)['height']) * parseInt(window.getComputedStyle(this.enlarge.firstElementChild)['height']) / this.show.clientWidth + 'px'
    }

    click(){
        this.list.addEventListener(this.type, e => {
            if(e.target.nodeName !== 'IMG') return
    
            for(let i = 0 ; i < this.list.children.length ; i++){
                this.list.children[i].classList.remove('active')
            }
            e.target.classList.add('active')
    
            this.show.firstElementChild.src = e.target.dataset.show
            this.enlarge.firstElementChild.src = e.target.dataset.enlarge
    
        })
    }
    
    moveout(){
        this.show.addEventListener('mouseover',() => {
            this.mask.style.display = 'block'
            this.enlarge.style.display = 'block'
        })
        
        this.show.addEventListener('mouseout',() => {
            this.mask.style.display = 'none'
            this.enlarge.style.display = 'none'
        })
    }

    move(){
        this.show.addEventListener('mousemove',e => {
            this.mask.style.left = e.offsetX - parseInt(getComputedStyle(this.mask)['width']) / 2 + 'px'
            if(e.offsetX - parseInt(getComputedStyle(this.mask)['width']) / 2 < 0) this.mask.style.left = 0
            if(e.offsetX - parseInt(getComputedStyle(this.mask)['width']) / 2 > this.show.clientWidth - parseInt(getComputedStyle(this.mask)['width'])) this.mask.style.left = this.show.clientWidth - parseInt(getComputedStyle(this.mask)['width']) +'px'
            
            this.mask.style.top = e.offsetY - parseInt(getComputedStyle(this.mask)['height']) / 2 + 'px'
            if(e.offsetY - parseInt(getComputedStyle(this.mask)['height']) / 2 < 0) this.mask.style.top = 0
            if(e.offsetY - parseInt(getComputedStyle(this.mask)['height']) / 2 > this.show.clientHeight - parseInt(getComputedStyle(this.mask)['height'])) this.mask.style.top = this.show.clientHeight - parseInt(getComputedStyle(this.mask)['height']) +'px'
    
            this.enlarge.firstElementChild.style.left = parseInt(window.getComputedStyle(this.enlarge)['width']) / parseInt(window.getComputedStyle(this.mask)['width']) * -parseInt(this.mask.style.left) + 'px'
            this.enlarge.firstElementChild.style.top = parseInt(window.getComputedStyle(this.enlarge)['height']) / parseInt(window.getComputedStyle(this.mask)['height']) * -parseInt(this.mask.style.top) + 'px'
        })
    }
    
}