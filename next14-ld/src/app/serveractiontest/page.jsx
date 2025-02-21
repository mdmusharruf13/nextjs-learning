import { addPost } from "@/utils/action";
import styles from "./serveractiontest.module.css";
import { getUsers } from "@/utils/data";

async function ServerActionTestPage() {
  const users = await getUsers();
  return (
    <div>
      <form action={addPost} className={styles.form}>
        <input type="text" name="title" placeholder="Enter title" required />
        <input type="text" name="desc" placeholder="Enter desc" required />
        <input type="text" name="slug" placeholder="Enter slug" required />
        <select name="userId" defaultValue="" required>
          <option value="" disabled>
            Select Option
          </option>
          {users.map((user) => (
            <option value={user._id.toString()} key={user._id.toString()}>
              {user.username}
            </option>
          ))}
        </select>
        <button className={styles.btn}>submit</button>
      </form>
    </div>
  );
}

export default ServerActionTestPage;
