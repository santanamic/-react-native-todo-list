import React, { useState, useEffect } from "react";
import {
	View,
	Text,
	TextInput,
	StyleSheet,
	TouchableOpacity,
	FlatList,
	Pressable,
	Modal,
	Picker,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

export default function Home() {
	let [taskTargetID, setTaskTargetID] = useState(false);

	let [taskTargetTitle, setTaskTargetTitle] = useState(false);

	let [taskTargetPriority, setTaskTargetPriority] = useState(false);

	let [taskFormAdd, setTaskFormAdd] = useState(false);

	let [taskFormRemove, setTaskFormRemove] = useState(false);

	let [taskFormEdit, setTaskFormEdit] = useState(false);

	let [taskItems, setTaskItems] = useState([
		{
			id: 0,
			title: "Invite your girlfriend to the movies",
			priority: "low",
		},
		{
			id: 1,
			title: "Test new task app functionality",
			priority: "medium",
		},
		{
			id: 2,
			title: "Deploy to production environment",
			priority: "high",
		},
	]);

	const prioritys = {
		low: {
			text: "Low Priority",
			style: {
				backgroundColor: "#e9faf5",
				color: "#50d1ad",
				borderColor: "#50d1ad",
			},
		},
		medium: {
			text: "Medium Priority",
			style: {
				backgroundColor: "#fef5e1",
				color: "#fccd69",
				borderColor: "#fccd69",
			},
		},
		high: {
			text: "High Priority",
			style: {
				backgroundColor: "#fff5f8",
				color: "#ffa8c4",
				borderColor: "#ffa8c4",
			},
		},
	};

	const removeTask = () => {
		console.log("Task id: " + taskTargetID);

		let allTasks = [...taskItems];

		allTasks = allTasks.filter((item, i) => {
			return item.id != taskTargetID;
		});

		setTaskItems(allTasks);
		setTaskFormRemove(false);
	};

	const addTask = () => {
		let newTask = {};

		newTask.id = +new Date();
		newTask.title = taskTargetTitle;
		newTask.priority = taskTargetPriority;

		taskItems.unshift(newTask);

		setTaskItems(taskItems);
		setTaskFormAdd(false);
	};

	const editTask = () => {
		console.log("Task id: " + taskTargetID);

		let allTasks = [...taskItems];

		allTasks = allTasks.filter((item, i) => {
			if (item.id == taskTargetID) {
				item.id = +new Date();
				item.title = taskTargetTitle;
				item.priority = taskTargetPriority;
			}

			return true;
		});

		setTaskItems(allTasks);
		setTaskFormEdit(false);
	};

	return (
		<View style={styles.container}>
			<Modal animationType="fade" transparent={true} visible={taskFormRemove}>
				<Pressable style={styles.moddalOverlay}>
					<View style={styles.modal}>
						<TouchableOpacity
							style={styles.modalButton}
							onPress={() => {
								setTaskFormRemove(false);
							}}
						>
							<AntDesign name="close" size={24} color="black" />
						</TouchableOpacity>
						<Text style={styles.modalTitle}>Remove task</Text>
						<Text style={styles.modalText}>
							When processing the task will be removed from the list.
						</Text>

						<View style={styles.buttonActions}>
							<TouchableOpacity
								style={[styles.button, styles.buttonSubmit]}
								onPress={() => {
									removeTask();
								}}
							>
								<Text style={styles.buttonSubmitText}>Remove</Text>
							</TouchableOpacity>
							<TouchableOpacity
								style={[styles.button, styles.buttonOutline]}
								onPress={() => {
									setTaskFormRemove(false);
								}}
							>
								<Text style={styles.buttonOutlineText}>Cancel</Text>
							</TouchableOpacity>
						</View>
					</View>
				</Pressable>
			</Modal>

			<Modal animationType="fade" transparent={true} visible={taskFormAdd}>
				<Pressable style={styles.moddalOverlay}>
					<View style={styles.modal}>
						<TouchableOpacity
							style={styles.modalButton}
							onPress={() => {
								setTaskFormAdd(false);
							}}
						>
							<AntDesign name="close" size={24} color="black" />
						</TouchableOpacity>
						<Text style={styles.modalTitle}>Add task</Text>
						<View style={styles.inputContainer}>
							<TextInput
								style={styles.inputField}
								placeholder="Description"
								placeholderTextColor="#424242"
								underlineColorAndroid="transparent"
								onChangeText={(text) => setTaskTargetTitle(text)}
							/>
							<Feather
								style={styles.inputIcon}
								name="edit"
								size={24}
								color="black"
							/>
						</View>
						<View style={styles.inputContainer}>
							<Picker
								style={styles.inputField}
								onValueChange={(text) => setTaskTargetPriority(text)}
							>
								<Picker.Item label="Priority" value="" />
								<Picker.Item label="Low" value="low" />
								<Picker.Item label="Medium" value="medium" />
								<Picker.Item label="High" value="high" />
							</Picker>
							<Feather
								style={styles.inputIcon}
								name="alert-circle"
								size={24}
								color="black"
							/>
						</View>
						<View style={styles.buttonActions}>
							<TouchableOpacity
								style={[styles.button, styles.buttonSubmit]}
								onPress={() => {
									addTask();
								}}
							>
								<Text style={styles.buttonSubmitText}>Save</Text>
							</TouchableOpacity>
							<TouchableOpacity
								style={[styles.button, styles.buttonOutline]}
								onPress={() => {
									setTaskFormAdd(false);
								}}
							>
								<Text style={styles.buttonOutlineText}>Cancel</Text>
							</TouchableOpacity>
						</View>
					</View>
				</Pressable>
			</Modal>

			<Modal animationType="fade" transparent={true} visible={taskFormEdit}>
				<Pressable style={styles.moddalOverlay}>
					<View style={styles.modal}>
						<TouchableOpacity
							style={styles.modalButton}
							onPress={() => {
								setTaskFormEdit(false);
							}}
						>
							<AntDesign name="close" size={24} color="black" />
						</TouchableOpacity>
						<Text style={styles.modalTitle}>Edit task</Text>
						<View style={styles.inputContainer}>
							<TextInput
								style={styles.inputField}
								placeholder="Description"
								placeholderTextColor="#424242"
								underlineColorAndroid="transparent"
								onChangeText={(text) => setTaskTargetTitle(text)}
								value={taskTargetTitle}
							/>
							<Feather
								style={styles.inputIcon}
								name="edit"
								size={24}
								color="black"
							/>
						</View>
						<View style={styles.inputContainer}>
							<Picker
								style={styles.inputField}
								value={taskTargetPriority}
								onValueChange={(text) => setTaskTargetPriority(text)}
							>
								<Picker.Item label="Priority" value="" />
								<Picker.Item label="Low" value="low" />
								<Picker.Item label="Medium" value="medium" />
								<Picker.Item label="High" value="high" />
							</Picker>
							<Feather
								style={styles.inputIcon}
								name="alert-circle"
								size={24}
								color="black"
							/>
						</View>
						<View style={[styles.buttonActions, styles.buttonActionsBetween]}>
							<View style={{ flexDirection: "row" }}>
								<TouchableOpacity
									style={[styles.button, styles.buttonOutline]}
									onPress={() => {
										setTaskFormEdit(false);
									}}
								>
									<Text style={styles.buttonOutlineText}>Cancel</Text>
								</TouchableOpacity>
								<TouchableOpacity
									style={[styles.button, styles.buttonSubmit]}
									onPress={() => {
										editTask();
									}}
								>
									<Text style={styles.buttonSubmitText}>Save</Text>
								</TouchableOpacity>
							</View>
							<View>
								<TouchableOpacity
									style={[styles.button, styles.buttonSubmit]}
									onPress={() => {
										setTaskFormEdit(false);
										setTaskFormRemove(true);
									}}
								>
									<Text style={styles.buttonSubmitText}>Remove</Text>
								</TouchableOpacity>
							</View>
						</View>
					</View>
				</Pressable>
			</Modal>
			<View style={styles.header}>
				<Text style={styles.headerText}>To do list</Text>
				<TouchableOpacity onPress={() => setTaskFormAdd(true)}>
					<AntDesign name="plussquare" size={35} color="orange" />
				</TouchableOpacity>
			</View>
			<View>
				<FlatList
					data={taskItems}
					keyExtractor={(item) => item.id}
					renderItem={({ item }) => (
						<Pressable
							onPress={() => {
								setTaskTargetID(item.id);
								setTaskTargetTitle(item.title);
								setTaskTargetPriority(item.priority);
								setTaskFormEdit(true);
							}}
						>
							<View style={[styles.item, prioritys[item.priority].style]}>
								<View style={[styles.itemLeft, prioritys[item.priority].style]}>
									<Text
										style={[
											styles.priorityText,
											prioritys[item.priority].style,
										]}
									>
										{prioritys[item.priority].text}
									</Text>
									<Text style={styles.taskText}>{item.title}</Text>
								</View>
								<View style={styles.circular}></View>
							</View>
						</Pressable>
					)}
				/>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: 20,
		paddingVertical: 70,
	},
	header: {
		alignItems: "center",
		justifyContent: "space-between",
		flexDirection: "row",
		marginBottom: 20,
	},
	headerText: {
		fontSize: 34,
		fontWeight: 900,
	},
	modal: {
		backgroundColor: "#fff",
		margin: 20,
		padding: 20,
		borderRadius: 20,
		borderColor: "#101823",
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 4,
		},
		shadowOpacity: 0.37,
		shadowRadius: 7.49,
		elevation: 12,
	},
	moddalOverlay: {
		backgroundColor: "#312d2db3",
		flex: 1,
		justifyContent: "center",
	},
	modalTitle: {
		fontSize: 20,
		fontWeight: 900,
		color: "#3e425c",
	},
	modalText: {
		marginTop: 20,
	},
	modalInput: {
		borderWidth: 1,
		padding: 10,
		marginBottom: 20,
	},
	modalButton: {
		alignItems: "flex-end",
	},
	inputContainer: {
		flex: 1,
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#e7edee",
		borderRadius: 10,
		borderColor: "#cdd1d2",
		paddingLeft: 20,
		paddingRight: 10,
		marginTop: 25,
	},
	inputField: {
		flex: 1,
		paddingBottom: 10,
		paddingTop: 10,
		backgroundColor: "#e7edee",
		color: "#424242",
		fontWeight: 500,
		fontSize: 17,
		borderWidth: 0,
	},
	inputIcon: {
		padding: 10,
	},
	buttonActionsBetween: {
		justifyContent: "space-between",
	},
	buttonActions: {
		flex: 1,
		flexDirection: "row-reverse",
		marginTop: 25,
		marginBottom: 10,
	},
	button: {
		borderRadius: 10,
		paddingLeft: 30,
		paddingRight: 30,
		paddingTop: 10,
		paddingBottom: 10,
		elevation: 2,
	},
	buttonSubmit: {
		backgroundColor: "#ffa500",
	},
	buttonSubmitText: {
		color: "#101823",
		fontWeight: 500,
	},
	buttonOutline: {
		backgroundColor: "#trasnparent",
	},
	buttonOutlineText: {
		color: "#101823",
		fontWeight: 500,
	},
	item: {
		borderRadius: 10,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		padding: 20,
		marginTop: 30,
		flexDirection: "row",
	},
	itemLeft: {
		borderLeftColor: "#fff",
		borderLeftWidth: 7,
		borderTopLeftRadius: 5,
		borderBottomLeftRadius: 5,
		paddingLeft: 15,
	},
	priorityText: {
		color: "#fff",
		fontSize: 15,
		fontWeight: 600,
		paddingBottom: 10,
	},
	taskText: {
		maxWidth: "90%",
		fontSize: 18,
		fontWeight: 500,
		lineHeight: 25,
		color: "#3e425c",
	},
	circular: {
		width: 12,
		height: 12,
		borderColor: "#00000099",
		borderWidth: 2,
		borderRadius: 5,
	},
});
