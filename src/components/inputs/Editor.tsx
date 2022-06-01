import { createStyles, makeStyles } from "@material-ui/core";
import draft, { convertToRaw, EditorState } from "draft-js";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Editor as EditorDraft } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import LoadingWrapper from "../LoadingWrapper";

const useStyles = makeStyles(() =>
  createStyles({
    wrapperClassName: {
      borderColor: "#D6E3F3",
      borderWidth: 1,
      borderStyle: "solid",
      borderRadius: 10,
    },
    borderNone: {
      border: "none",
    },
    editorClassName: ({ minEditorHeight }: Props) => ({
      minHeight: minEditorHeight || 0,
      padding: 10,
      cursor: "text",
    }),
    readOnly: {
      display: "none",
    },
  }),
);

interface Props {
  htmlValue?: string;
  onHtmlValueChange?(editorState: string): void;
  minEditorHeight?: number;
  readOnly?: boolean;
  loading?: boolean;
  truncate?: boolean;
}

const Editor = ({
  htmlValue: htmlValueProp,
  onHtmlValueChange: onHtmlValueChangeProp,
  minEditorHeight,
  readOnly = false,
  loading = false,
  truncate = false,
}: Props) => {
  const classes = useStyles({ minEditorHeight });
  const contentState = useMemo(() => {
    const contentBlock = htmlToDraft((htmlValueProp as string) || "");
    return draft.ContentState.createFromBlockArray(contentBlock.contentBlocks);
  }, [htmlValueProp]);
  const editorState = useMemo(
    () => draft.EditorState.createWithContent(contentState),
    [contentState],
  );

  const [editorStateLocal, setEditorStateLocal] = useState(editorState);
  const [firstTimeTouched, setFirstTimeTouched] = useState(false);

  useEffect(() => {
    !firstTimeTouched && setEditorStateLocal(editorState);
  }, [editorState, firstTimeTouched]);

  const onEditorStateChangeCallBack = useCallback(
    (editorStateValues: EditorState) => {
      setFirstTimeTouched(true);
      setEditorStateLocal(editorStateValues);
      onHtmlValueChangeProp &&
        onHtmlValueChangeProp(
          draftToHtml(convertToRaw(editorStateValues.getCurrentContent())),
        );
    },
    [onHtmlValueChangeProp],
  );

  return (
    <LoadingWrapper loading={loading}>
      <EditorDraft
        editorState={editorStateLocal}
        onEditorStateChange={onEditorStateChangeCallBack}
        wrapperClassName={
          readOnly ? classes.borderNone : classes.wrapperClassName
        }
        editorClassName={
          truncate
            ? `${classes.editorClassName} truncateEditor`
            : classes.editorClassName
        }
        toolbarHidden={readOnly}
        readOnly={readOnly}
        toolbar={{
          options: [
            "inline",
            "blockType",
            "fontSize",
            "fontFamily",
            "list",
            "textAlign",
            "colorPicker",
            "link",
            "history",
            "remove",
          ],
        }}
      />
    </LoadingWrapper>
  );
};

export default Editor;
