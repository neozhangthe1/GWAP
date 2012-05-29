/*!
 * Box2D Car Game Example
 * http://42games.net/html5games/box2d-car-game/
 *
 * This is an example game for the book HTML5 Games Development: A Beginning Guide.
 *
 * Copyright 2010, Thomas Seng Hin Mak
 * makzan@42games.net
 *
 * All Right Reserved.
 */

var carGame = {

}

var canvas;
var ctx;
var canvasWidth;
var canvasHeight;

$(function() {
	carGame.world = createWorld();
	console.log("The world is created", carGame.world);
	carGame.ground = createGround();
	console.log("Ground is created", carGame.ground);
	carGame.box = createBox();
	console.log("Box is created", carGame.box);

	//get the reference of the context
	canvas = document.getElementById('game');
	ctx = canvas.getContext('2d');
	canvasWidth = parseInt(canvas.width);
	canvasHeight = parseInt(canvas.height);

	//draw the world
	drawWorld(carGame.world, ctx);
});

function createWorld() {
	var worldAABB = new b2AABB();
	worldAABB.minVertex.Set(-4000, -4000);
	worldAABB.maxVertex.Set(4000, 4000);

	var gravity = new b2Vec2(0, 300);
	var doSleep = false;
	var world = new b2World(worldAABB, gravity, doSleep);

	return world;
}

function createGround() {
	var groundSd = new b2BoxDef();
	groundSd.extents.Set(250, 25);
	groundSd.restitution = 0.4;

	var groundBd = new b2BodyDef();
	groundBd.AddShape(groundSd);
	groundBd.position.Set(250, 370);
	var body = carGame.world.CreateBody(groundBd);

	return body
}

function createBox(){
	var boxSd=new b2BoxDef();
	boxSd.density=1.0;
	boxSd.friction=1.5;
	boxSd.restitution=.4;
	boxSd.extents.Set(40,20);
	
	var boxBd=new b2BodyDef();
	boxBd.AddShape(boxBd);
	boxBd.position.Set(50,210);
	carGame.world.CreateBody(boxBd);
}

function drawWorld(world, context) {
	for(var b = world.m_bodyList; b != null; b = b.m_next) {
		for(var s = b.GetShapeList(); s != null; s = s.GetNext()) {
			drawShape(s, context);
		}
	}
}

function drawShape(shape, context) {
	context.strokeStyle = '#003300';
	context.beginPath();
	switch(shape.m_type) {
		case b2Shape.e_circleShape:
			var circle = shape;
			var pos = circle.m_position;
			var r = circle.m_radius;
			var segments = 16.0;
			var theta = 0.0;
			var dtheta = 2.0 * Math.PI / segments;
			// draw circle
			context.moveTo(pos.x + r, pos.y);
			for(var i = 0; i < segments; i++) {
				var d = new b2Vec2(r * Math.cos(theta), r * Math.sin(theta));
				var v = b2Math.AddVV(pos, d);
				context.lineTo(v.x, v.y);
				theta += dtheta;
			}
			context.lineTo(pos.x + r, pos.y);

			// draw radius
			context.moveTo(pos.x, pos.y);
			var ax = circle.m_R.col1;
			var pos2 = new b2Vec2(pos.x + r * ax.x, pos.y + r * ax.y);
			context.lineTo(pos2.x, pos2.y);
			break;
		case b2Shape.e_polyShape:
			var poly = shape;
			var tV = b2Math.AddVV(poly.m_position, b2Math.b2MulMV(poly.m_R, poly.m_vertices[0]));
			context.moveTo(tV.x, tV.y);
			for(var i = 0; i < poly.m_vertexCount; i++) {
				var v = b2Math.AddVV(poly.m_position, b2Math.b2MulMV(poly.m_R, poly.m_vertices[i]));
				context.lineTo(v.x, v.y);
			}
			context.lineTo(tV.x, tV.y);
			break;
	}
	context.stroke();
}

