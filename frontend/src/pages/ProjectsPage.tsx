import CookieConsent from 'react-cookie-consent';
import WelcomeBand from '../components/WelcomeBand';
import { useState } from 'react';
import CategoryFilter from '../components/CategoryFilter';
import ProjectList from '../components/ProjectList';
import Fingerprint from '../Fingerprint';
import CartSummary from '../components/CartSummary';

function ProjectsPage() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]); // This is "lifted up" to the parent function so that the sibling functions can both see it

  return (
    <>
      <div className="container mt-4">
          <CartSummary />
          <WelcomeBand />

        <div className="row">
          <div className="col-md-3">
            <CategoryFilter
              selectedCategories={selectedCategories}
              setSelectedCategories={setSelectedCategories}
            />
          </div>
          <div className="col-md-9">
            <ProjectList selectedCategories={selectedCategories} />
          </div>
        </div>
      </div>

      <CookieConsent>
        This website uses cookies to enhance the user experience.
      </CookieConsent>
      <Fingerprint />
    </>
  );
}
export default ProjectsPage;