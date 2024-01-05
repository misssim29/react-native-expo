import { Pressable, Text, View, StyleSheet } from "react-native";
import { Link, useLocalSearchParams } from "expo-router";

function ParamsRouteMove() {
  const { id } = useLocalSearchParams();
  console.log(id);
  return (
    <View>
      <Link href="/" style={styles.link} asChild>
        <Pressable style={styles.btn}>
          <Text style={styles.txt}>Home</Text>
        </Pressable>
      </Link>
      <Link
        href={{
          pathname: "/",
          params: { id: "changes" },
        }}
        style={styles.link}
        asChild
      >
        <Pressable style={styles.btn}>
          <Text style={styles.txt}>Add Id</Text>
        </Pressable>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  link: {
    margin: 10,
  },
  btn: {
    backgroundColor: "blue",
    padding: 20,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  txt: {
    color: "#fff",
    textAlign: "center",
  },
});

export default ParamsRouteMove;
