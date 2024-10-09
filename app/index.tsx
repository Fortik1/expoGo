import {useState} from 'react';
import {
    ActionSheetIOS,
    Button,
    Text,
    TextInput,
    View,
    TouchableOpacity,
    StyleSheet,
    Animated,
    FlatList
} from "react-native";
import add = Animated.add;

export default function Index() {
    const [taskInInput, setTaskInInput] = useState("");
    const [stateButton, setStateButton] = useState("Add Task");
    const [tasksState, setTasksState] = useState([]);
    const [indexUpdate, setIndexUpdate] = useState("");

    const addTask = () => {
        if (taskInInput) {
            if (stateButton === "Edit Task") {
                const copyData = [...tasksState];
                copyData[indexUpdate] = taskInInput;
                setTasksState(copyData);
                setStateButton("Add Task");
                setTaskInInput("");
            } else {
                setTasksState([...tasksState, taskInInput]);
                setTaskInInput("");
            };
        };
    };

    const editTask = (index) => {
        setIndexUpdate(index);
        setTaskInInput(tasksState[index]);
        setStateButton("Edit Task");
    };

    const deleteTask = (index) => {
        const data = [...tasksState];
        data.splice(index, 1);
        setTasksState(data);
    };

    const renderItem = ({ item, index }) => (
        <View style={styles.tasksList}>
            <Text style={styles.item}>{item}</Text>
                <View style={styles.taskButtons}>
                    <TouchableOpacity
                        onPress={() => editTask(index)}
                    >
                        <Text style={styles.editButton}>Edit</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => deleteTask(index)}
                    >
                        <Text style={styles.deleteButton}>Delete</Text>
                    </TouchableOpacity>
                </View>
        </View>
    );

    return (
      <View style={styles.container}>
        <Text>TODO LIST</Text>
          <TextInput
              style={styles.input}
              placeholder="Enter task"
              value={taskInInput}
              onChangeText={(text) => setTaskInInput(text)}
          />
          <TouchableOpacity
              style={styles.addButton}
              onPress={addTask}
          >
              <Text style={styles.buttonText}>{stateButton}</Text>
          </TouchableOpacity>
          <FlatList
              data={tasksState}
              renderItem={renderItem}
              keyExtractor={(item, index) => index.toString()}/>
      </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 40,
        marginTop: 40
    },
    addButton: {
        backgroundColor: 'grey',
        padding: 10,
        marginBottom: 10,
        borderRadius: 5
    },
    input: {
        borderWidth: 3,
        borderColor: "#ccc",
        padding: 10,
        marginBottom: 10,
        borderRadius: 10,
        fontSize: 18,
    },
    buttonText: {
      textAlign: "center",
      fontWeight: "bold"
    },
    tasksList: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 15,
        fontSize: 18
    },
    item: {
        fontSize: 19,
    },
    taskButtons: {
        flexDirection: "row",
    },
    editButton: {
        marginRight: 10,
        color: "grey",
        fontWeight: "bold",
        fontSize: 18
    },
    deleteButton: {
        color: "red",
        fontWeight: "bold",
        fontSize: 18
    }
});
