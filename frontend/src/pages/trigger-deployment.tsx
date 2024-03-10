import React, { useState } from 'react';
import axios from 'axios';
import { Button } from '@ab/shared/ui';

function Deploy() {
  const [message, setMessage] = useState(false);
  const [loading, setLoading] = useState(false)

  async function triggerDeplyment() {
    setLoading(true)
    setMessage(true)
    const res = await axios.post(
      'https://api.vercel.com/v1/integrations/deploy/prj_XwnziZpVPY3ZKo9IUO0wRdWCg7pC/ynwFXYI818',
    );
    if(res.status === 201) {
      setLoading(false)
    } else {
      setMessage(false)
      alert('Something went wrong with the deployment, please try again later')
    }
  }
  const displaySuccess = message ? '' : 'invisible'
  return (
    <div className="w-full h-screen flex items-center justify-center bg-black flex-col">
      <Button
        name="Deploy For Production"
        variant="secondary"
        onClick={triggerDeplyment}
        className='brightness-75 hover:brightness-125 ease-in duration-300 mb-4'
      />
        <p className={`text-beige text-lg ${displaySuccess}`}>
          {loading ? 'Loading ...' : 'The deployment was successful, please wait a couple of minutes for the changes to take effect'}
        </p>
    </div>
  );
}

export default Deploy;
