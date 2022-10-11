import { FC } from "react";
import OnlineContacts from "./contacts/Online";

const HomePage: FC = () => {
  return (
    <div className="defaultView">
      <h2>Välkommen till Vargtimma</h2>
      <div className="homepageWrapper">
        <div className="pageInfo">
          <h3>Säkerhetsinformation:</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam
            perferendis mollitia, magni pariatur blanditiis fugit illum
            laudantium optio, laborum animi error illo. Excepturi beatae iusto
            distinctio velit molestias rerum dicta qui? Minus reprehenderit
            suscipit reiciendis, illum sint quisquam facilis soluta, vitae
            possimus quam explicabo magni optio tempore nemo sapiente harum
            dolor illo atque placeat quod necessitatibus doloribus hic
            obcaecati. Voluptatibus in ad eligendi aut enim quisquam ut
            veritatis tempora aperiam eaque optio accusantium, consequuntur
            obcaecati aspernatur, ullam mollitia velit iste incidunt amet sit
            est eveniet. Nisi veritatis debitis, quisquam nostrum esse,
            quibusdam labore accusamus expedita voluptate impedit dignissimos
            cum culpa eos architecto magni. Voluptas, architecto cupiditate
            possimus, nostrum consequuntur necessitatibus earum tenetur quis,
            neque ut officiis vitae vero totam illo aspernatur consectetur
            quisquam suscipit modi vel numquam magni repellendus? Aut dicta
            accusamus eos, deleniti repellendus ad laudantium, tempora
            necessitatibus mollitia id, totam culpa similique enim adipisci
            possimus numquam nihil aliquid?
          </p>
        </div>
        <div className="rightSidebar">
          <OnlineContacts />
        </div>
      </div>
    </div>
  );
};
export default HomePage;
