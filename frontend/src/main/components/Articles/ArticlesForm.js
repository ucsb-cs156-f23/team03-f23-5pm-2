import { Button, Form, Row, Col } from 'react-bootstrap';
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

function ArticlesForm({ initialContents, submitAction, buttonLabel = "Create" }) {

    // Stryker disable all
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm(
        { defaultValues: initialContents || {}, }
    );
    // Stryker restore all

    const navigate = useNavigate();

    // For explanation, see: https://stackoverflow.com/questions/3143070/javascript-regex-iso-datetime
    // Note that even this complex regex may still need some tweaks

    // Stryker disable next-line Regex
    
    

    return (

        <Form onSubmit={handleSubmit(submitAction)}>


            <Row>
                /</Row>

                {initialContents && (
                    <Col>
                        <Form.Group className="mb-3" >
                            <Form.Label htmlFor="id">Id</Form.Label>
                            <Form.Control
                                data-testid= {ArticlesForm + "id"}
                                id="id"
                                type="text"
                                {...register("id")}
                                value={initialContents.id}
                                disabled
                            />
                        </Form.Group>
                    </Col>
                )}

                <Col>
                    <Form.Group className="mb-3" >
                        <Form.Label htmlFor="title">Title</Form.Label>
                        <Form
                            data-testid= {ArticlesForm + "-title"} 
                            id= "title"
                            type="text"
                            isInvalid={Boolean(errors.title)}
                            {...register("title", { required: "Title is required.", maxlength: {value:20, message: "Max lenght of title is 20 characters" })}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.explanation?.message}
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" >
                <Form.Label htmlFor="email">Email</Form.Label>
                <Form.Control
                    data-testid={ArticleForm + "-email"}
                    id="email"
                    type="text"
                    isInvalid={Boolean(errors.email)}
                    {...register("email", {
                        required: "Email is required."
                    })}
                />
                <Form.Control.Feedback type="invalid">
                    {errors.email.message}
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" >
                <Form.Label htmlFor="dateAdded">Date Added</Form.Label>
                <Form.Control
                    data-testid={ArticleForm + "-dateAdded"}
                    id="dateAdded"
                    type="datetime-local"
                    isInvalid={Boolean(errors.dateAdded)}
                    {...register("dateAdded", {
                        required: "Date Added is required."
                    })}
                />
                <Form.Control.Feedback type="invalid">
                    {errors.dateAdded.message}
                </Form.Control.Feedback>
            </Form.Group>



            <Button
                type="submit"
                data-testid={ArticleForm + "-submit"}
            >
                {buttonLabel}
            </Button>
            <Button
                variant="Secondary"
                onClick={() => navigate(-1)}
                data-testid={ArticleForm + "-cancel"}
            >
                Cancel
            </Button>
          </Col>
        </Form>

    )
}

export default ArticlesForm;