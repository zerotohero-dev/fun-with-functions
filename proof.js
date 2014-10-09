// Lemma 1:
fn.bind(ctx, arg1, arg2)
// is equivalent to
function(arg1, arg2) { return fn.call(ctx, arg1, arg2); }

// Lemma 2:
fn.bind(context, arg, arg2);
// is equivalent to
Function.prototype.bind.call(fn, context, arg1, arg2);

// Lemma 3:
fn.call(ctx, arg1, arg2);
// is equivalent to
Function.prototype.call.call(fn, ctx, arg1, arg2);

////////////////////////////////////////////////////////////////////////////////
function variadicBind(fn, ctx, arg1, arg2) {
	return fn.bind(ctx, arg1, arg2);
}
////////////////////////////////////////////////////////////////////////////////
function variadicBind(fn, ctx, arg1, arg2) {
	return Function.prototype.bind.call( fn, ctx, arg1, arg2 );
	       ///////////////////////
}
////////////////////////////////////////////////////////////////////////////////
function variadicBind(fn, ctx, arg1, arg2) {
	return Function.prototype.call.call(Function.prototype.bind, fn, ctx, arg1, arg2);
	       /////////// fn ////////      ////////// ctx ////////  // arg1, ... //////
}
////////////////////////////////////////////////////////////////////////////////
Function.prototype.call.bind(Function.prototype.bind, fn, ctx, arg1, arg2);
////////////////////////////////////////////////////////////////////////////////
Function.prototype.call.bind(Function.prototype.bind);
