

model.Post.url.onGet = function() {
	return '#/Detail/' + this.ID;
};


model.Post.displayDate.onGet = function() {
	function strpad(str) {
		return ('00' + str).substring(str.toString().length);
	}
	return strpad(this.date.getDate()) + '/' + strpad(this.date.getMonth() + 1) + '/' + this.date.getFullYear();
};
