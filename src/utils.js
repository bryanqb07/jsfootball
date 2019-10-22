const Utils = {
    DIRS: {
        N: [0, -1],
        S: [0, 1],
        E: [1, 0],
        W: [-1, 0],
        NE: [1, -1],
        SE: [1, 1],
        SW: [-1, 1],
        NW: [-1, -1],
        STOP: [0, 0]
    },

    arrEqual: (arr1, arr2) => {
        return arr1[0] == arr2[0] && arr1[1] == arr2[1]
    },

    changeVelocity: (receiver, obj, differential) => {
        // const ballSpeed = 30;
        const steps = 10;
        const targetPosition = Utils.targetReceiverPosition(steps, receiver);
        const currentPosition = obj.options.pos;
        const dx = targetPosition[0] - currentPosition[0];
        const dy = targetPosition[1] + differential - currentPosition[1];
        // const factor = ballSpeed / (dx * dx + dy * dy);
        return [dx / steps, dy / steps];
    },

    getDistance: (pos1, pos2) => {
        const dx = pos1[0] - pos2[0];
        const dy = pos1[1] - pos2[1];
        return Math.sqrt(dx * dx + dy * dy);
    },

    inArea: (pos1, pos2, radius) => {
        pos2[0] <= pos1[0] + radius && pos2[1] <= pos2[1] + radius;
     },

    targetReceiverPosition: (num_steps, receiver) => {
        let current_x = receiver.options.pos[0]
        let current_y = receiver.options.pos[1] 
        const speed = receiver.options.speed;
        const vel = [receiver.options.vel[0], receiver.options.vel[1]]
        const route = receiver.selected_route;
        const mirror = receiver.options.mirror;
        let route_step = receiver.route_step;
        let distance_traveled = receiver.distance_traveled;
        let num_iterations = 0
        while(num_iterations < num_steps){
            if (route_step < route.length) {
                const next_step = route[route_step]
                if (Array.isArray(next_step)) {
                    vel[0] = speed * route[route_step][0] * mirror;
                    vel[1] = speed * route[route_step][1]
                    route_step++;
                } else {
                    if (distance_traveled >= next_step) {
                        route_step++;
                    }
                }
            }
            current_x += vel[0];
            current_y += vel[1];
            distance_traveled += speed;
            num_iterations++;
        }
        return [current_x, current_y];
    },


}


export default Utils;