//封装一个给定路径draw image的函数
const imageFromPath = (path) => {
    let img = new Image()
    img.src = path
    return img
}
//封装 Paddle 保存所有信息
const Paddle = () => {
    let image = imageFromPath('img/paddle.png')
    let o = {
        image: image,
        x: 130,
        y: 120,
        speed: 5,
    }
    o.moveLeft = () => {
        o.x -= o.speed
    }
    o.moveRight = () => {
        o.x += o.speed
    }
    //判断球与挡板是否相交
    o.collide = (ball) => {
        if (ball.y + ball.image.height > o.y) {
            if (ball.x > o.x && ball.x < o.x + o.image.width) {
                log('相撞')
                return true
            }
        }
        return false
    }
    return o
}
const Ball = () => {
    let image = imageFromPath('img/ball.png')
    let o = {
        image: image,
        x: 150,
        y: 100,
        speedX: 5,
        speedY: 5,
        fired: false,
    }
    o.fire = () => {
        o.fired = true
    }
    o.move = () => {
        if (o.fired) {
            if (o.x < 0 || o.x > 290) {
                log('haha')
                o.speedX *= -1
            }
            if (o.y < 0 || o.y > 142) {
                log('````````')
                o.speedY *= -1
            }
            o.x += o.speedX
            o.y += o.speedY
        }
    }
    return o
}
//封装 GuaGame
const GuaGame = () => {
    let g = {
        actions: {},
        keydowns: {},
    }
    let canvas = e('#id-canvas')
    let context = canvas.getContext('2d')
    g.canvas = canvas
    g.context = context
    g.drawImage = (guaImage) => {
        g.context.drawImage(guaImage.image, guaImage.x, guaImage.y)
    }
    bindEvent(window, 'keydown', (e) => {
        g.keydowns[e.key] = true
    })
    bindEvent(window, 'keyup', (e) => {
        g.keydowns[e.key] = false
    })
    g.registerAction = (key, callback) => {
        //把按键按下去的函数存到相应按键下
        g.actions[key[0]] = callback
        g.actions[key[1]] = callback
    }
    setInterval(() => {
        let actions = Object.keys(g.actions)
        actions.forEach((item) => {
            if (g.keydowns[item]) {
                //如果按键被按下调用注册的action
                g.actions[item]()
            }
        })
        //update
        g.update()
        //clear
        context.clearRect(0, 0, canvas.width, canvas.height)
        //draw
        g.draw()

    }, 1000/30)
    return g
}
const __main = () => {
    let game = GuaGame()
    let paddle = Paddle()
    let ball = Ball()

    game.registerAction(['a', 'ArrowLeft'], () => {
        paddle.moveLeft()
    })
    game.registerAction(['d', 'ArrowRight'], () => {
        paddle.moveRight()
    })
    game.registerAction(['f', ' '], () => {
        ball.fire()
    })
    game.update = () => {
        ball.move()
        //判断相撞
        if (paddle.collide(ball)) {
            ball.speedY *= -1
        }
    }
    game.draw = () => {
        //draw
        game.drawImage(paddle)
        game.drawImage(ball)
    }

}
__main()


