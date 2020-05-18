import Matrix from "./matrix";

export class Vector extends Matrix {
    constructor(length:number) {
        super(length,1);
    }
}

export class Vector2d {
    x:number;
    y:number;
    /**
     * Create a new two dimensional vector.
     * @param {number} x the x position of the vector
     * @param {number} y the y position of the vector
     */
    constructor(x?:number,y?:number) {
        /** @typedef number the x position of the vector */
        this.x=x||0;
        /** @typedef number the y position of the vector */
        this.y=y||0;
    }

    /**
     * Add another vector to this vector.
     * @param {Vector2d} v the vector to be added.
     * @returns {Vector2d}
     */
    add(v:Vector2d):Vector2d {
        this.x+=v.x;
        this.y+=v.y;
        return this;
    }

    /**
     * Add two vectors.
     * @param {Vector2d} v1 the first vector.
     * @param {Vector2d} v2 the second vector.
     * @returns {Vector2d} the result of the vector addition.
     */
    static add(v1:Vector2d, v2:Vector2d):Vector2d {
        return v1.copy().add(v2);
    }

    /**
     * Subtract another vector from this vector.
     * @param {Vector2d} v the vector to subtracted.
     * @returns {Vector2d}
     */
    sub(v:Vector2d):Vector2d {
        this.x-=v.x;
        this.y-=v.y;
        return this;
    }
    /**
     * Get the difference of two vectors.
     * @param {Vector2d} v1 the operand vector.
     * @param {Vector2d} v2 the operator vector.
     * @returns {Vector2d} the result of the subtraction.
     */
    static sub(v1:Vector2d, v2:Vector2d):Vector2d {
        return v1.copy().sub(v2);
    }
    /**
     * Get the dot product of this and the passed vector.
     * @param {Vector2d} v the vector to multiplly with.
     * @returns {number} the result of the multiplication.
     */
    dot(v:Vector2d):number {
        return this.x*v.x+this.y*v.y;
    }
    /**
     * Scale the vector by a certain factor.
     * @param {number} n the factor to scale by.
     * @returns {Vector2d}
     */
    scale(n:number):Vector2d {
        this.x*=n;
        this.y*=n;
        return this;
    }
    /**
     * Get the scaled version of a vector.
     * @param {Vector2d} v the vector to scale.
     * @param {number} n the factor to scale by.
     * @returns {Vector2d} the scaled vector.
     */
    static scale(v:Vector2d, n:number):Vector2d {
        return v.copy().scale(n);
    }
    /**
     * Get the length of the vector.
     * @returns {number} the length.
     */
    mag():number {
        return this.magSq()**(1/2);
    }
    /**
     * Get the length of the vector squared
     * @returns {number} the length squared
     */
    magSq():number {
        return this.x**2+this.y**2;
    }
    /**
     * Get a vector that has the same direction but has a length of one.
     * @returns {Vector2d}
     */
    normalize():Vector2d {
        return this.scale(1/this.mag());
    }

    /**
     * Get the normalized version of a vector
     * @param {Vector2d} v the vector to be normalized
     * @returns {Vector2d} the normalized vector.
     */
    static normalize(v:Vector2d):Vector2d {
        return v.copy().normalize();
    }
    /**
     * Set the length of this vector
     * @param {number} n new length.
     * @returns {Vector2d}
     */
    setMag(n:number) {
        return this.normalize().scale(n);
    }
    /**
     * Get the vector with the length set to n.
     * @param {Vector2d} v vector to scale.
     * @param {number} n the new length.
     * @returns {Vector} the resized vector
     */
    static setMag(v:Vector2d,n:number) {
        return v.copy().setMag(n);
    }
    /**
     * Set the x and y coordinates of the vector
     * @param {number} x the new x coordinate
     * @param {number} y the new y coordinate
     */
    set(x:number,y:number) {
        this.x=x;
        this.y=y
    }
    /**
     * Get a copy of this vector
     * @returns {Vector2d} a copy of this vector.
     */
    copy(){
        return new Vector2d(this.x,this.y);
    }
    /**
     * Get the angle of this vector.
     * @returns {number} the angle of this vector.
     */
    angle(){
        return Math.atan2(this.y,this.x);
    }
    /**
     * Rotate the vector
     * @param angle the angle to rotate by
     */
    rotate(angle:number) {
        let v=Vector2d.rotate(this,angle);
        this.x=v.x;
        this.y=v.y;
    }
    /**
     * Create a vector of length one rotated in this direction.
     * @param {number} angle the angle to rotate by.
     * @returns {Vector2d} the created vector.
     */
    static fromAngle(angle:number){
        return new Vector2d(Math.cos(angle),Math.sin(angle));
    }
    /**
     * Create a random vector of length one.
     * @returns {Vector2d} the created vector.
     */
    static random() {
        return Vector2d.fromAngle(Math.random()*Math.PI*2);
    }
    /**
     * Rotate the vector
     * @param angle the angle to rotate by
     * @returns {Vector2d} 
     */
    static rotate(v:Vector2d,angle:number):Vector2d {
        let r=v.mag();
        let o=v.angle();
        o+=angle;
        return Vector2d.fromAngle(o).scale(r);
    }
    /**
     * Create a vector from polar coordinates
     * @param o angle
     * @param r radius
     * @returns {Vector2d} vector with length r rotated by o radians
     */
    static fromPolar(o:number,r:number) {
        return Vector2d.fromAngle(o).scale(r);
    }
}