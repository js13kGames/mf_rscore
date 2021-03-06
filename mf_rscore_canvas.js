
var basicShip = function (obj, ctx) {

    ctx.save();
    ctx.translate(obj.x + obj.hw, obj.y + obj.hh);
    ctx.rotate(obj.a);

    ctx.beginPath();
    ctx.moveTo(-10, 0);
    ctx.lineTo(-25, -18);
    ctx.lineTo(20, 0);
    ctx.lineTo(-25, 18);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.restore();

},

drawHome = function (ctx) {

    var pos;

    if (rs.d.d < rs.d.sd) {

        pos = vp.makeVPRel({
                x : 0,
                y : 0
            });

        ctx.fillStyle = 'rgba(0,64,128,' + (1 - (rs.d.d / rs.d.sd)).toFixed(2) + ')';
        ctx.beginPath();

        ctx.arc(pos.x, pos.y, rs.d.sd, 0, _.tau);
        ctx.fill();

    }

};

// draw method
var rscore_canvas = function () {

    var x,
    obj,
    y,
    w,
    h;

    C.cls('rgba(' + Math.floor(255 * rs.d.p) + ',0,0,1)');

    // draw ships
    C.hiDraw(function (ctx) {

        var pw = 640 / 8,
        ph = 480 / 8;

        drawHome(ctx);
        C.drawGrid(pw - vp.x % pw, ph - vp.y % ph, 8, 8, pw, ph);

        // player ships
        rs.ps.units.forEach(function (ship) {

            var obj = _.c(ship),

            pos = vp.makeVPRel(obj);

            obj.x = pos.x;
            obj.y = pos.y;
            //C.dBX(obj);

            ctx.strokeStyle = '#00ffff';
            basicShip(obj, ctx);

        });

        // enemy ships
        rs.es.units.forEach(function (ship) {

            var obj = _.c(ship),

            pos = vp.makeVPRel(obj);

            obj.x = pos.x;
            obj.y = pos.y;

            //C.dBX(obj);
            ctx.strokeStyle = '#ff0000';
            ctx.fillStyle = '#000000';
            basicShip(obj, ctx);

            ctx.fillStyle = 'rgba(255,255,255,.5)';
            ctx.fillRect(obj.x, obj.y, obj.w, 5);
            ctx.fillStyle = 'rgba(0,255,0,.5)';
            ctx.fillRect(obj.x, obj.y, obj.w * (ship.hp / ship.maxHP), 5);
        });

        // player shots
        rs.ps.shots.units.forEach(function (sh) {

            var obj = vp.makeVPRel(sh);

            ctx.fillStyle = '#00afff';
            ctx.fillRect(obj.x, obj.y, obj.w, obj.h);

        });

        // enemy shots
        rs.es.shots.units.forEach(function (sh) {

            var obj = vp.makeVPRel(sh);

            ctx.fillStyle = '#ffffff';
            ctx.fillRect(obj.x, obj.y, obj.w, obj.h);

        });

        // RED bar
        ctx.fillStyle = '#afafaf';
        ctx.fillRect(220, 10, 200, 20);
        ctx.fillStyle = '#ff0000';
        ctx.fillRect(220, 10, rs.d.p * 200, 20);

        ctx.fillStyle = '#ffffff';
        ctx.textBaseline = 'top';
        ctx.textAlign = 'center';
        ctx.fillText('RED', 320, 10);

        var obj = rs.ps.units[0];
        if (obj === undefined) {
            obj = {}

        }
        ctx.textAlign = 'left';
        C.drawInfo([

                'score: ' + rs.score,
                'hp: ' + (obj.hp ? obj.hp + '/' + obj.maxHP : 'dead'),
                'fire Rate: ' + (Math.floor(obj.fr) || '')

            ], 10, 10, 20, '20px courier', '#00ff00');

        // draw info
        C.drawInfo([

                'skill points: ' + rs.a.sp

            ].concat(rs.a.ready), 450, 20, 15, '15px courier', '#00ff00');

        dp.stack.forEach(function (ani) {

            ani.bx.forEach(function (bx) {

                var obj = _.c(bx),

                pos = vp.makeVPRel(obj);

                obj.x = pos.x;
                obj.y = pos.y;
                C.dBX(obj);

            });

        });

    });

};
