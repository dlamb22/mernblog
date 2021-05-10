import React from 'react';

const Form = () => {
  return (
    <div className='pt-2'>
      <form>
        <div className='form-floating mb-3 mt-5'>
          <input
            type='title'
            className='form-control'
            id='floatingInput'
            placeholder='Title'
          />
          <label htmlFor='floatingInput'>Article Title</label>
        </div>
        <div className='form-floating'>
          <textarea
            className='form-control'
            placeholder='Write markup here'
            id='floatingTextarea'
            style={{ height: '250px' }}
          ></textarea>
          <label htmlFor='floatingTextarea'>Markdown Blog Article</label>
        </div>
        <a href='/' className='btn btn-secondary mt-3 me-2'>
          Cancel
        </a>
        <button type='submit' className='btn btn-primary mt-3'>
          Save
        </button>
      </form>
    </div>
  );
};

export default Form;
