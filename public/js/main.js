// attach an event listener to the parent class so we're not adding potentially dozens of event listeners, and then delete the todo from the DB if the button is clicked
document.querySelector(".notes").addEventListener("click", (e) => {
	if (e.target.classList.contains("note")) {
		handleDeleteNote(e.target.id);
	}
});

const handleDeleteNote = async (id) => {
	try {
		const response = await fetch("notes/deleteNote", {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ id }),
		});
		const data = await response.json();
		console.log(data);
		location.reload();
	} catch (error) {}
};
